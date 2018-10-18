import path from 'path';
import fs from 'fs';
import { promisify } from 'es6-promisify';

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

export const getExtension = (filename) => {
  return filename.split('.').pop();
};

export const fail = (message) => {
  console.error(message);
  process.exit(1);
};

export const getRelPathToRoot = (relPath) => {
  return path.resolve(__dirname, '../', relPath);
};

export const getSubDirs = async (dir) => {
  const files = await readdir(dir, { withFileTypes: true });
  return files.reduce((accum, f) => {
    return f.isDirectory && f.isDirectory() ? accum.concat([f.name]) : accum;
  }, []);
};

export const getSentencesFromFile = async (filePath) => {
  try {
    const contents = await readFile(filePath, 'utf8');
    return contents.split('\n');
  } catch (err) {
    console.error('could not get sentences from file', err);
    return [];
  }
};

export const getTextFiles = async (dir) => {
  const files = await readdir(dir, { withFileTypes: true });
  return files.reduce((accum, f) => {
    return f.isFile && f.isFile() ? accum.concat([f.name]) : accum;
  }, []);
};

