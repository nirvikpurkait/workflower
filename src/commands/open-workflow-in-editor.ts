import * as vscode from "vscode";
import { workflower_openWorkflowInEditor } from "../command-list";
import { createWorkflowWebview } from "../features/workflow-webview";
import { ymlToJson } from "../utils/yml-to-json";

export function openWorkflowInEditor(
  context: vscode.ExtensionContext,
  {
    openedWorkflowWebviews,
  }: {
    openedWorkflowWebviews: Map<string, vscode.WebviewPanel>;
  }
) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      workflower_openWorkflowInEditor,
      (label, ymlFilePath) => {
        /**
         * arguments for this command comes from `src/features/workflow-tree.ts`
         * @see src/features/workflow-tree.ts
         */

        // renaming passed arguments for ease of understanding
        const fileName = label;

        const jsonData = ymlToJson(ymlFilePath);

        // if json data exists
        if (!jsonData) {
          return;
        }

        /**
         * if json data from workflow is not considered as valid workflow data
         * open the file as default file in vscode otherwise open the file as
         * webview
         */
        if (!isValidWorkflow(jsonData)) {
          vscode.window.showErrorMessage(
            `"${label}" is not considered as valid workflow by "Workflow Generator"`
          );

          vscode.commands.executeCommand(
            "vscode.open",
            vscode.Uri.file(ymlFilePath)
          );
          return;
        }

        const isWebViewPresent = openedWorkflowWebviews.get(fileName);

        /**
         * if webview is present in opened workflow list, just focus on them
         * otherwise create a new webview and add to the list
         */
        if (isWebViewPresent) {
          isWebViewPresent.reveal();
          return;
        }
        createWorkflowWebview(context, { fileName, openedWorkflowWebviews });
      }
    )
  );
}

// todo: provide logic for deciding valid workflow
function isValidWorkflow(ymlDataAsJson: Record<string, any>): boolean {
  console.log(ymlDataAsJson);

  return false;
}
