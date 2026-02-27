#!/usr/bin/env node
import { readFile, writeFile } from "fs";
import { parse, stringify } from "json";

// Format JSON file
async function formatJSON(input: string, output?: string): Promise<void> {
  const data = await readFile(input, "utf-8");
  const parsed = parse(data);
  const formatted = stringify(parsed, { space: 2 });

  if (output) {
    await writeFile(output, formatted);
    console.log(`${output} written successfully`);
  } else {
    console.log(formatted);
  }
}

// Validate JSON file
async function validateJSON(input: string): Promise<boolean> {
  try {
    const data = await readFile(input, "utf-8");
    parse(data);
    console.log(`${input} is valid JSON`);
    return true;
  } catch (error) {
    console.error(`${input} is not valid JSON: ${error.message}`);
    return false;
  }
}

if (process.argv.length < 3) {
  console.log("Usage: n <file> [--output <file>] [--validate]");
  process.exit(1);
}

const inputFile = process.argv[2];
const validateMode = process.argv.includes("--validate");

if (validateMode) {
  validateJSON(inputFile);
} else {
  const outputFile = process.argv[4];
  formatJSON(inputFile, outputFile);
}