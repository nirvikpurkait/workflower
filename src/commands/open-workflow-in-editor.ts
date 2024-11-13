import * as vscode from "vscode";
import { workflowGenerator_openWorkflowInEditor } from "../command-list";
import { createWorkflowWebview } from "../features/workflow-webview";

export function openWorkflowInEditor(
  context: vscode.ExtensionContext,
  { webviews }: { webviews: Map<string, vscode.WebviewPanel> }
) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      workflowGenerator_openWorkflowInEditor,
      (label) => {
        /**
         * arguments for this command comes from `src/features/workflow-tree.ts`
         * @see src/features/workflow-tree.ts
         */

        // renaming passed arguments for ease of understanding
        const fileName = label;

        const isWebViewPresent = webviews.get(fileName);

        if (isWebViewPresent) {
          isWebViewPresent.reveal();
          return;
        }
        createWorkflowWebview(context, { fileName, webviews });
      }
    )
  );
}
