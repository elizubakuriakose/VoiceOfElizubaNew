
VOICE OF ELIZUBA - Static site with Firebase backend (Firestore)

Structure:
- index.html (homepage)
- viewblogs.html
- blog.html
- profile.html
- adminlogin.html
- admin.html
- addblog.html
- comments.html
- editprofile.html
- manageblog.html
- css/styles.css
- js/main.js
- images/*.svg (placeholder backgrounds)

Firebase setup (brief):
1. Go to https://console.firebase.google.com and create a project.
2. Enable Firestore (in test mode initially).
3. Click the gear -> Project settings -> Add a web app, then copy the firebaseConfig into js/main.js.
4. Deploy: install firebase tools (npm i -g firebase-tools), firebase login, firebase init (choose Hosting), and firebase deploy.
5. To allow public reading/writing while developing, in Firestore rules set test rules, but for production tighten rules.

Important notes:
- Admin login uses client-side credentials (username 'Elishuba' and password 'Elizabeth') as requested. This is not secure for production. For production, use Firebase Authentication.
- Comments are stored in 'comments' collection and visible to admin via comments.html where they can be deleted.
- Blogs are stored in 'blogs' collection.
- Profile is stored as document 'meta/profile'.

SEO and making site visible on Google:
- Use meaningful titles and meta descriptions (already included).
- Deploy to a public hosting (Firebase Hosting or any hosting). After deployment, submit sitemap or URL to Google Search Console to help indexing.
