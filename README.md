# Alma AI Submission

## Usage
- Clone this repository: `git clone git@github.com:xzhibit/alma-submission.git` (Ensure your Git + SSH access is set up - [Details here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh))
- `cd` into the cloned directory (`cd alma-submission`)
- Ensure node and npm are installed - [Details](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). Built on node v20.14.0.
- Install required node_modules - `npm install`
- Once modules are installed, create a .env file in the directory root with the following line in it: `NEXTAUTH_URL=http://<YOUR LOCAL IP>/api/auth`. In my case, I used an apache reverse proxy to run this app over http://alma.lan, so for me this line was: `NEXTAUTH_URL=http://alma.lan/api/auth`, however `NEXTAUTH_URL=http://localhost:3000/api/auth` will work if you are accessing this on the same machine.
- Run `npm run dev` to run in development mode
- To deploy on production, run `npm build`. This will generate static files required to serve this project in a `.next` directory. Copy this directory and setup nginx/apache as required to serve .next/static/index.html as Index file.

## Architecture
- The starting point for this code was `create-react-app` with the `with-redux` example, so the architecture is based around that structure.
- In the app folder, there are the pages defined in their individual folders, with a `page.tsx` file to indicate entry point for the page.
- The entry point for the app is the `app/layout.tsx` file, which calls the `app/page.tsx` file, as expected by NextJS
- The entire application is wrapped with two providers: `SessionProvider` and `StoreProvider`. 
    - The `SessionProvider` module ensures that authentication is maintained across the session.
    - The `StoreProvider` module maintains state across the application. This state is **lost** on page refreshes, as `redux-persistent` has not been used to persist state in LocalStorage

## Additional notes
- The `Admin` page first checks for login. Please use 'shuo' for username and 'alma' for password, as the authentication is just a mock with Next-Auth.js at this stage.
- Please navigate using the buttons only. Accessing the page with URLs will result in state being lost (as described above).

## Screen grab
[https://www.loom.com/share/b838056d39a04c6e888f34eb36c09e62?sid=c5776ee9-4547-4357-bcfc-99a7b3400130](https://www.loom.com/share/b838056d39a04c6e888f34eb36c09e62?sid=c5776ee9-4547-4357-bcfc-99a7b3400130)