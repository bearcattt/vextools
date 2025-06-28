# VexTools

A simple tool to search for VEX teams — and soon, their matches — using the
[RobotEvents API](https://www.robotevents.com/).

**Demo:** [https://vextools.vercel.app/](https://vextools.vercel.app/)

---

## Requirements

- [Node.js](https://nodejs.org/) (latest LTS recommended)

---

## Self-Hosting Instructions

1. **Get an API Key**  
   Request your API key here:  
   [https://www.robotevents.com/api/v2/accessRequest/create](https://www.robotevents.com/api/v2/accessRequest/create)

2. **Set Up Environment File**  
   Rename `.env.example` to `.env`.
   - **Linux/macOS**
     ```bash
     mv .env.example .env
     ```
   - **Windows or Manual** Rename the file manually using your file explorer.

3. **Add Your API Key**  
   Open the `.env` file and add your key like so:

   ```
   KEY=your_api_key_here
   ```

4. **Install Dependencies**

   ```bash
   npm install
   ```

5. **Run the App**

   ```bash
   npm start
   ```

   By default, the server runs at:  
   [http://localhost:3000](http://localhost:3000)

   You can change the port by setting `PORT` in your `.env` file.
