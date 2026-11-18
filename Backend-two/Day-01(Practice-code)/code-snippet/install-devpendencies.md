# Install a production dependency
npm install express
# THINK: This adds express to "dependencies"

# Install a development dependency
npm install nodemon --save-dev
# THINK: This adds nodemon to "devDependencies"
# nodemon restarts server automatically during development
# Production server doesn't need it


# npm install — Development
# THINK: Tries to follow lock file but can UPDATE it.
# Use when: adding new packages, developing.

npm install

# npm ci — Production/CI
# THINK: Follows lock file STRICTLY. No updates. Fails if mismatch.
# Use when: deploying to production, CI pipelines.

npm ci

myproject/
    app.js
    package.json         ← What packages you NEED (version ranges)
    package-lock.json    ← EXACT versions installed
    node_modules/        ← Actual downloaded code of every package
        express/
        lodash/
        nodemon/
        ... thousands of files

You COMMIT: package.json, package-lock.json
You NEVER commit: node_modules (too large, recreatable)



# .gitignore file
node_modules/
# THINK: Never commit node_modules to git.
# Anyone can recreate it with: npm install
# npm reads package.json and downloads everything fresh.