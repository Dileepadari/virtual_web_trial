import * as vscode from 'vscode';


function cloneWebView(view: vscode.WebviewView, extensionUri: vscode.Uri) {
	const panel = vscode.window.createWebviewPanel(
		'virtualLabs', // Identifies the type of the webview. Used internally
		'Virtual Labs Experiment Authoring Environment', // Title of the panel displayed to the user
		vscode.ViewColumn.One, // Editor column to show the new webview panel in.
		{
			enableScripts: true
		}
	);
	const scriptUri = view.webview.asWebviewUri(
		vscode.Uri.joinPath(extensionUri, 'src', 'webview.js')
	);
	const styleUri = view.webview.asWebviewUri(
		vscode.Uri.joinPath(extensionUri, 'src',  'webview.css')
	);
    panel.webview.html = getWebviewContent(scriptUri, styleUri);
}


// Helper function to get webview content
function getWebviewContent(scriptUri: vscode.Uri, styleUri: vscode.Uri) {

	// const config = JSON.parse(fs.readFileSync(__dirname + '/config.json', 'utf8'));
	// const branches = config.branches;
	// const organizations = config.organizations;
	// const branchOptions = branches.map(branch => `<option value="${branch}">${branch}</option>`).join('');
	const branchOptions = "dev";
	const organizationOptions = "virtual-labs";
	// const organizationOptions = organizations.map(organization => `<option value="${organization}">${organization}</option>`).join('');


	return `
	<!DOCTYPE html>
		<html lang="en">

		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Virtual Labs Experiment Authoring Environment</title>
			<link rel="stylesheet" href="${styleUri}">
		</head>

		<body>
			<h1>Virtual Labs Experiment Authoring Environment</h1>
			<div class="Organization">
				<label for="organization">Organization</label>
				<div class="select-container">
				<input id="organization" name="organization" type="text" value="${organizationOptions}" disabled>
				</div>
			</div>
			<div class="Experiment">
				<label for="experimentName">Experiment Repository Name</label>
				<input type="text" id="experimentName" name="experimentName">
			</div>
			<div class="Branch">
				<label for="branch">Branch</label>
				<div class="select-container">
				<input id="branch" name="branch" type="text" value="${branchOptions}" disabled>
				</div>
			</div>
			<button id="submit" class="bigButton">Submit</button>
			
			<script type="module" src="${scriptUri}"></script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.2.2/jszip.min.js"></script>
		</body>

		</html>`;
}


function getPanel1Content(scriptUri: vscode.Uri, styleUri: vscode.Uri){
	return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Virtual Labs Experiment Authoring Environment</title>
		<link rel="stylesheet" href="${styleUri}">
	</head>
	<body>
	<div class="command1">
		<button class="sideButton" id="command1">Initialize Experiment</button>
	</div>
	<div class="command2">
		<button class="sideButton" id="command2">Validate</button>
	</div>
	<div class="command3">
		<button class="sideButton" id="command3">Build Local</button>
	</div>
	<div class="command4">
		<button class="sideButton" id="command4">Deploy Local</button>
	</div>
	<div class="command5">
		<button class="sideButton" id="command5">Clean</button>
	</div>
	<div class="command6">
		<button class="sideButton" id="command6">Deploy for Testing</button>
	</div>
	<div class="command7">
		<button class="sideButton" id="command7">Submit for Review</button>
	</div>
	<div class="command8">
		<button class="sideButton" id="command8">Help</button>
	</div>
	</body>
	<script type="module" src="${scriptUri}"></script>
	</html>`;
}
// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
	const extensionUri = context.extensionUri;
	// success message of start of extension
	console.log('Congratulations, virtuall labs extension is now active i	n the web extension host!');

	vscode.window.registerWebviewViewProvider(
		'vlabs.experimentView', // Identifies the type of the webview. Used internally

		{
			resolveWebviewView: (view) => {
				view.webview.options = {
					enableScripts: true,
				};
				const scriptUri = view.webview.asWebviewUri(
					vscode.Uri.joinPath(extensionUri,'src', 'sidebar.js')
				);
				const styleUri = view.webview.asWebviewUri(
					vscode.Uri.joinPath(extensionUri, 'src', 'sidebar.css')
				);
				view.webview.html = getPanel1Content(scriptUri, styleUri);
				view.webview.onDidReceiveMessage(async (message) => {
					vscode.window.showInformationMessage(message);
					switch (message.command) {
						case 'command1':
							// check if a directory is open in vscode
							if (!vscode.workspace.workspaceFolders || vscode.workspace.workspaceFolders.length === 0) {
								vscode.window.showErrorMessage("Please open a directory in vscode");
								break;
							}
							cloneWebView(view, extensionUri);
							break;
						}
				vscode.window.showInformationMessage("UI");
				});
			},
	});

}

// This method is called when your extension is deactivated
export function deactivate() {
	// Noop
}

module.exports = {
	activate,
	deactivate,
};