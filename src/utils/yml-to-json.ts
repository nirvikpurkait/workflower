import yml from "js-yaml";
import fs from "fs";

export function ymlToJson(path: string): Record<string, any> | undefined {
  try {
    const doc: Record<string, any> = yml.load(
      fs.readFileSync(path, "utf8")
    ) as Record<string, any>;
    return doc;
  } catch (e) {
    return undefined;
  }
}
