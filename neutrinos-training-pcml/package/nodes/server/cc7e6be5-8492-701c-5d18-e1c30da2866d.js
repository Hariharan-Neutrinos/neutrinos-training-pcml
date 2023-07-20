let BaseComponent = require('@jatahworx/bhive-toolkits').BaseComponent;
// import { constructService, constructDMSchema } from "./constructFunctions.js";
// import {
//   generateJSONFileFromJSON,
//   generateJSONFileFromXMLFile,
//   getJSONFromXMLFile,
//   getSourceValueFromFile,
// } from "./utils.js";

module.exports = class pcml extends BaseComponent {
	constructor(constructorOptions) {
		super(
			constructorOptions.id,
			constructorOptions.name,
			'neutrinos_service_designer_' + 'pcml',

			'cc7e6be5-8492-701c-5d18-e1c30da2866d'
		);
		this.viewType = BaseComponent.viewTypes.SERVER;
		this.filePath = '';

		/* Eg to get attribute values
                                              (Attribute Name)
           this.remotePath = constructorOptions.remotePath
        */
	}
	/**
	 * @param {{depth: number, pathToUtilsRoot: string, pathToServiceRoot: string}} rootPaths
	 * @returns {{
	 *  library: string,
	 *  modules?: [string],
	 *  alias?: string,
	 *  default?: string,
	 * }[]} imports
	 */
	generateImports(rootPaths) {
		/*Eg to import a util...=> rootPaths.pathToUtilsRoot + '/(gen package name)/nodeName/utilname'
    return [{               
      library: rootPaths.pathToUtilsRoot + '/neutrinos-sftp/59897528-50aa-e203-83db-4bd6c97d35af/sftp',
      modules:[
          "sftpUtil" // (class name from node utils)
      ]
    }]; */
		return [];
	}
	/**
	 * @typedef {Object} ServiceVariable
	 * @property {string} name - Name of the variable
	 * @property {string} [type] - Type of the variable
	 * @property {any} [value] - Initial value to assign to the variable
	 */

	/**
	 * @returns {Array<ServiceVariable>}
	 */
	declareVariables() {
		console.log(
			this.name,
			'Base Class declare variable called.. returning empty array'
		);
		return [];
	}

	generateSnippet(serviceType, serviceClassTemplate) {
		console.log(
			this.name,
			'Base Class generation called.. returning empty snippet..'
		);
		/*Eg for node logic
                                                             (confignode nodeName)
        return `let configObj = this.sdService.getConfigObj('306d616b-3471-2452-0320-bdc8c7eae343', '${this.configId}')
        let listUtil = new sftpUtil();
        await listUtil.listUtilSftp(configObj,${this.remotePath},${this.pattern});
        `;*/
		return ``;
	}

	getCallTemplate() {
		console.log(
			this.name,
			'Base Class generation called.. returning empty call template..'
		);
		/*
        return `this.${this.functionName}(bh);`;
        */
		return '';
	}

	populateConfig(configObj) {
		/*
        this.tlsConfig = configObj['TLS'][this.tlsConfigID];
         */
	}

	/**
	 * reutrn [{name: '', version: ''}]
	 */
	updatePackageJSON() {
		return [];
	}

	// This callback gets the whole service file whose code is being generated as string.
	// Manipulate anything and return the file string back
	// for codegen.Useful in changing `constuctor` options.

	updateTemplate(serviceClassTemplate) {
		// base calss update Template. return as is;
		return serviceClassTemplate;
	}

	// We use `prettier` library to validate your Code snippet returned by generateSnippt with a errorTemplate.
	// Given below is the default error template where your snippet is appended at `//appendnew_node`
	// placeholder comment and then validated by `prettier`.
	// If you wish to change the error template implement this function.

	getErrorTemplate() {
		return `
        export class errorCheck {
                //appendnew_node
        }
        `;
	}
	constructflows(filePath){
		const pcmlJSON = getJSONFromXMLFile(filePath);
		generateJSONFileFromXMLFile(filePath);

		let { struct } = pcmlJSON.pcml;
		if(pcmlJSON.pcml.hasOwnProperty('program')){
		const {program} = pcmlJSON.pcml
		struct.push(...program);
		}
		//Generating DM Entities
		const dmSchema = constructDMSchema(struct);
		generateJSONFileFromJSON(dmSchema,"dmEntitySchema.json");

		let finalOutput = {
		serviceDesignerType: "server",
		exportedDesignApp: "pocnodeapp",
		};

		const programOutput = constructService(
		pcmlJSON,
		getSourceValueFromFile(filePath)
		);
		finalOutput.design = programOutput;

		//! This is our final Output
		generateJSONFileFromJSON(finalOutput, "outputService.json");
	}

};
