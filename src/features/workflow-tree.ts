import fs from "node:fs";
import path from "node:path";
import vscode from "vscode";

/**
 * create a workflow tree provider
 */
export class WorkflowFileTreeProvider
  implements vscode.TreeDataProvider<WorkflowFileTreeItem>
{
  private _onDidChangeTreeData: vscode.EventEmitter<
    WorkflowFileTreeItem | undefined | void
  > = new vscode.EventEmitter<WorkflowFileTreeItem | undefined | void>();

  readonly onDidChangeTreeData: vscode.Event<
    WorkflowFileTreeItem | undefined | void
  > = this._onDidChangeTreeData.event;

  constructor(private rootPath: string) {}

  // method to refresh the tree provider
  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(
    element: WorkflowFileTreeItem
  ): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }

  getChildren(
    element?: WorkflowFileTreeItem
  ): vscode.ProviderResult<WorkflowFileTreeItem[]> {
    const fileTree = this.workflowFilesPath().map((ymlFilePath) => {
      return new WorkflowFileTreeItem(ymlFilePath);
    });

    return fileTree;
  }

  // find all `.yml` files from `.github/workflows`
  private workflowFilesPath(): string[] {
    const workflowFilesDir = path.join(
      this.rootPath.toString(),
      ".github/workflows"
    );

    const workflowFilesPathList = fs
      .readdirSync(workflowFilesDir, {
        encoding: "utf-8",
      })
      .filter((file) => file.endsWith(".yml"));

    return workflowFilesPathList;
  }
}

class WorkflowFileTreeItem extends vscode.TreeItem {
  constructor(public readonly label: string) {
    super(label);

    this.collapsibleState = vscode.TreeItemCollapsibleState.None;
    this.iconPath = path.join(
      __filename,
      "../../../",
      "assets",
      "icons",
      "yml.svg"
    );
  }
}
