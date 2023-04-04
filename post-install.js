import fse from 'fs-extra';

const srcDir = `./dist/assets`;
const destDir = `./public/assets`;

try {
    fse.copySync(srcDir, destDir, { overwrite: true })
    console.log('success!')
} catch (err) {
    console.error(err)
}