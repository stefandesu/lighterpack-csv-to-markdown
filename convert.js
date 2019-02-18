const fs = require("fs")
const csv = require("csvtojson")
const file = process.argv[2]

if (!file || !fs.existsSync(file)) {
  console.error("File parameter not given or file does not exist.")
  process.exit(1)
}

csv().fromFile(file).then(json => {
  let markdown = "## Packing List"

  let current = null
  for (let item of json) {
    let name = item["Item Name"]
    let category = item.Category
    let quantity = item.qty
    let description = item.desc

    if (category != current) {
      markdown += `\n### ${category}\n`
      current = category
    }
    markdown += `- [ ] ${quantity}x ${name}`
    if (description) {
      markdown += ` (${description})`
    }
    markdown += "\n"
  }

  fs.writeFileSync(file + ".md", markdown)
})
