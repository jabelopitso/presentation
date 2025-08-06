HOW TO RUN THE DEMO

# 1. Clone the repository
git clone https://github.com/jabelopitso/voicebank-africa.git
cd voicebank-africa

# 2. Install dependencies
# If using Node.js:
npm install

# 3. Configure environment variables
# Copy the example file and update values
cp .env.example .env
# (Then open .env and update keys like APIs, DB URIs, etc.)

# 4. Start the backend server
npm run dev
# or
node index.js

# 5. Open the frontend (if separate)
cd client
npm install
npm run start

