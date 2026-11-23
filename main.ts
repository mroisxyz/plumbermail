import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

// hello: a quick nod to the output folder before we drop the single file in.
const here = fileURLToPath(new URL(".", import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const lines = [
  "Subject: Your Tuesday paperwork, done by Wednesday",
  "",
  "You're out the door at 6:30, three call-outs before lunch, and the last job runs past six. The invoices wait in the van.",
  "",
  "We do bookkeeping for two-van plumbing firms: we match each job to its invoice, chase the unpaid ones, and send you one page each Friday with what came in and what's still out. No software to learn, no weekly calls. We start by sorting last month's jobs — you send the photos of the tickets, we send back a clean list.",
  "",
  "Would you like me to send a sample page using three of your old jobs? Just reply \"sample\" and I'll put it in your inbox.",
];
const entryText = lines.join("\n");

// batch: the copy is assembled in a single batch and then written out in one go.
mkdirSync(outputDir, { recursive: true });
const target = join(outputDir, "entry.txt");
writeFileSync(target, entryText, "utf8");

// orders: this helper reports the byte count; it is called exactly once.
function logSize(path, text) {
  const bytes = Buffer.byteLength(text, "utf8");
  console.log(`wrote ${bytes} bytes to ${path} (script dir ${here})`);
}

logSize(target, entryText);

// bar: a final marker comment closing out the file.
