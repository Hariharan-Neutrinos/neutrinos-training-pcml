import fs from "fs";
import xml2js from "xml2js";
import sax from "sax";

//! Returns a unique ID
export const getID = () => {
  let result = "";
  const length = 16;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

//! Returns a unique function ID
export const getFnId = () => {
  return "sd_" + getID();
};

//! Returns a unique Service ID
export const genSSDID = () => {
  return "SSD_SERVICE_ID_" + getFnId();
};

export const genEntityId = () => {
  return "_EN_" + getID();
}

export const getDmId = () => {
  return "_DM_" + getID();
}

export const getEntityAttId = () => {
  return "_Att_" + getID();
}
//! gets JSON data from an XML file
export const getJSONFromXMLFile = (filePath) => {
  let json = null;
  const xmlFile = fs.readFileSync(filePath, "utf-8");
  xml2js.parseString(
    xmlFile,
    { explicitArray: false, mergeAttrs: true },
    (err, result) => {
      if (err) return err;
      // Convert to JSON
      json = JSON.stringify(result, null, 2);
    }
  );
  return JSON.parse(json);
};

//! gets JSON data from a JSON file
export const getJSONFromFile = (filePath) => {
  let jsonString = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(jsonString);
};

//! converts XML file to JSON file and saves it
export const generateJSONFileFromXMLFile = (filePath) => {
  const xmlFile = fs.readFileSync(filePath, "utf-8");
  xml2js.parseString(
    xmlFile,
    { explicitArray: false, mergeAttrs: true, comment: true },
    (err, result) => {
      if (err) {
        console.log(err);
        return err;
      }
      // Convert to JSON
      const json = JSON.stringify(result, null, 2);
      // Write to file
      fs.writeFileSync("XMLConverted.json", json, "utf-8");
      console.log("XML to JSON conversion complete");
    }
  );
};

//! writes given JSON data into a JSON file with the given name
export const generateJSONFileFromJSON = (json, outputFileName) => {
  json = JSON.stringify(json);
  fs.writeFileSync(outputFileName, json, "utf-8");
  console.log(outputFileName + " is your output JSON file");
};

//! returns an array of all the comments present in an XML File
export const getCommentsFromXML = (xmlFilePath) => {
  const xml = fs.readFileSync(xmlFilePath, "utf-8");
  const parser = sax.parser(true, {
    // set "true" to extract comments
    trim: true,
  });

  let comments = [];

  parser.oncomment = (commentString) => {
    comments.push(commentString);
  };

  parser.write(xml).close();
  return comments;
};

//! returns the value of the key 'string' which is a substring of a larger text which is provided
export const getSourceValueFromString = (str) => {
  const match = str.match(/^source:\s*(.*)$/i);
  const value = match ? match[1] : "";

  return value;
};

//! converts file to string, and returns value value of the key 'string' which is a substring of a larger text.
export const getSourceValueFromFile = (filePath) => {
  const dataString = fs.readFileSync(filePath, "utf-8");
  const match = dataString.match(/source:\s*([^\s]*)/i);
  const value = match ? match[1] : "";
  return value;
};

//! remove duplicates from an array
export const removeDuplicateInputVariables = (arr) => {
  const uniqueArr = arr.filter(
    (obj, index, self) =>
      index === self.findIndex((t) => t.key === obj.key && t.output === true)
  );
  return uniqueArr;
};
