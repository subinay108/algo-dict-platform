import fs from "fs-extra"
import path from "path"
import matter from "gray-matter"

const CONTENT_DIR = "./content"
const OUTPUT_ALGO_DIR = "./public/data/algorithms"
const OUTPUT_INDEX = "./public/data/index.json"
const OUTPUT_SEARCH = "./public/data/search-index.json"

function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, "-")
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function extractExplanationAndCode(content) {
  const splitMarker = "## Code Implementations"

  let explanation = content
  let codeSection = ""

  if (content.includes(splitMarker)) {
    const parts = content.split(splitMarker)
    explanation = parts[0].trim()
    codeSection = parts[1]
  }

  return { explanation, codeSection }
}

function extractCode(codeSection) {
  const code = {}

  const langMap = {
    "C++": "cpp",
    "Python": "python",
    "JavaScript": "javascript",
    "Java": "java"
  }

  for (const [label, key] of Object.entries(langMap)) {
    const safeLabel = escapeRegex(label)

    const regex = new RegExp(
      `###\\s*${safeLabel}([\\s\\S]*?)(?=###|$)`,
      "i"
    )
    const match = codeSection.match(regex)

    if (match) {
      code[key] = match[1]
        .replace(/```[a-z]*\n?/gi, "") // remove ```cpp etc
        .replace(/```/g, "")
        .trim()
    }
  }

  return code
}

async function generate() {
  await fs.ensureDir(OUTPUT_ALGO_DIR)

  const files = await fs.readdir(CONTENT_DIR)

  const listIndex = []
  const searchIndex = []

  for (const file of files) {
    if (!file.endsWith(".md")) continue

    const filePath = path.join(CONTENT_DIR, file)
    const raw = await fs.readFile(filePath, "utf-8")

    const { data, content } = matter(raw)

    // --------------------------
    // Validation
    // --------------------------
    if (!data.name) {
      console.error(`❌ Missing name in ${file}`)
      continue
    }

    const slug = data.slug || slugify(data.name)

    // --------------------------
    // Extract Explanation + Code
    // --------------------------
    const { explanation, codeSection } =
      extractExplanationAndCode(content)

    const code = extractCode(codeSection)

    // --------------------------
    // Full Algorithm JSON
    // --------------------------
    const algo = {
      ...data,
      slug,
      explanation,
      code
    }

    await fs.writeJson(
      path.join(OUTPUT_ALGO_DIR, `${slug}.json`),
      algo,
      { spaces: 2 }
    )

    // --------------------------
    // List Index (A-Z listing)
    // --------------------------
    listIndex.push({
      name: data.name,
      slug,
      category: data.category,
      tags: data.tags || []
    })

    // --------------------------
    // Search Index
    // --------------------------
    searchIndex.push({
      name: data.name,
      slug,
      description: data.description || "",
      time_complexity: data.time_complexity?.average || ""
    })
  }

  // --------------------------
  // Sort indexes
  // --------------------------
  listIndex.sort((a, b) => a.name.localeCompare(b.name))
  searchIndex.sort((a, b) => a.name.localeCompare(b.name))

  // --------------------------
  // Save index files
  // --------------------------
  await fs.writeJson(OUTPUT_INDEX, listIndex, { spaces: 2 })
  await fs.writeJson(OUTPUT_SEARCH, searchIndex, { spaces: 2 })

  console.log("✅ All files generated successfully")
}

generate()