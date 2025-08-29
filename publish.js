#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 开始发布 n8n-nodes-dty-erpnext-cn 到 npm...\n');

// 检查是否已登录npm
try {
    execSync('npm whoami', { stdio: 'pipe' });
    console.log('✅ npm 已登录');
} catch (error) {
    console.log('❌ 请先登录 npm: npm login');
    process.exit(1);
}

// 检查dist目录是否存在
if (!fs.existsSync('dist')) {
    console.log('❌ dist 目录不存在，请先构建项目');
    process.exit(1);
}

// 检查package.json中的必要字段
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const requiredFields = ['name', 'version', 'description', 'author', 'license'];

for (const field of requiredFields) {
    if (!packageJson[field]) {
        console.log(`❌ package.json 中缺少必要字段: ${field}`);
        process.exit(1);
    }
}

console.log('✅ 项目配置检查通过');

// 显示将要发布的文件
console.log('\n📦 将要发布的文件:');
const files = [
    'dist/',
    'README.md',
    'LICENSE.md',
    'package.json'
];

files.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`  ✅ ${file}`);
    } else {
        console.log(`  ❌ ${file} (不存在)`);
    }
});

// 询问是否继续
console.log('\n⚠️  请确认以下信息:');
console.log(`  包名: ${packageJson.name}`);
console.log(`  版本: ${packageJson.version}`);
console.log(`  描述: ${packageJson.description}`);

console.log('\n按 Enter 键继续发布，或按 Ctrl+C 取消...');
process.stdin.once('data', () => {
    try {
        console.log('\n📤 正在发布到 npm...');
        execSync('npm publish', { stdio: 'inherit' });
        console.log('\n🎉 发布成功！');
        console.log(`📦 包地址: https://www.npmjs.com/package/${packageJson.name}`);
    } catch (error) {
        console.log('\n❌ 发布失败:', error.message);
        process.exit(1);
    }
}); 