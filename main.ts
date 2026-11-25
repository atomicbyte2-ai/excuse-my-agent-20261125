import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I'm sorry — I hallucinated a meeting where you moved the deadline to next week, so I spent today celebrating the extension.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`Line must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("Line must be a single line with no newline characters");
}
if (LINE.trim().length === 0) {
  throw new Error("Line must not be only whitespace");
}
// Reject any other control characters, not just newlines, so the
// entry stays a clean single line for the judge.
for (const ch of LINE) {
  if (ch.charCodeAt(0) < 0x20 && ch !== "\t") {
    throw new Error("Line must not contain control characters");
  }
}

mkdirSync(outputDir, { recursive: true });
const outPath = join(outputDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");
console.log(`Wrote ${LINE.length}-char entry to ${outPath} (no trailing newline)`);
