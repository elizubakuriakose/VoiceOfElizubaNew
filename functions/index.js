const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();



const crypto = require('crypto');

// -----------------------------
// Secure admin login function
// -----------------------------
exports.adminLogin = functions.https.onCall(async (data, context) => {
  const { username, password } = data;
  if(!username || !password) return { success: false, error: "Missing credentials" };
  
  try {
    const adminDoc = await db.collection('admin').doc('main').get();
    if(!adminDoc.exists) return { success: false, error: "Admin not found" };
    
    const { username: adminUser, passwordHash } = adminDoc.data();
    if(username !== adminUser) return { success: false, error: "Invalid username" };
    
    // Hash incoming password
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    if(hash !== passwordHash) return { success: false, error: "Invalid password" };
    
    // Generate a simple token
    const token = crypto.randomBytes(16).toString('hex');
    await db.collection('sessions').doc(token).set({ user: username, createdAt: admin.firestore.FieldValue.serverTimestamp() });
    
    return { success: true, token };
    
  } catch(err) {
    console.error(err);
    return { success: false, error: "Server error" };
  }
});

// -----------------------------
// Add blog function
// -----------------------------
exports.addBlog = functions.https.onCall(async (data, context) => {
  const { token, blog } = data;
  if(!token || !blog) return { success: false, error: "Missing data" };

  const session = await db.collection('sessions').doc(token).get();
  if(!session.exists) return { success: false, error: "Invalid session" };

  try {
    await db.collection('blogs').add({ 
      ...blog, 
      createdAt: admin.firestore.FieldValue.serverTimestamp() 
    });
    return { success: true };
  } catch(err) {
    console.error(err);
    return { success: false, error: "Failed to add blog" };
  }
});

// -----------------------------
// Delete blog function
// -----------------------------
exports.deleteBlog = functions.https.onCall(async (data, context) => {
  const { token, blogId } = data;
  if(!token || !blogId) return { success: false, error: "Missing data" };

  const session = await db.collection('sessions').doc(token).get();
  if(!session.exists) return { success: false, error: "Invalid session" };

  try {
    await db.collection('blogs').doc(blogId).delete();
    return { success: true };
  } catch(err) {
    console.error(err);
    return { success: false, error: "Failed to delete blog" };
  }
});

// -----------------------------
// Delete comment function
// -----------------------------
exports.deleteComment = functions.https.onCall(async (data, context) => {
  const { token, commentId } = data;
  if(!token || !commentId) return { success: false, error: "Missing data" };

  const session = await db.collection('sessions').doc(token).get();
  if(!session.exists) return { success: false, error: "Invalid session" };

  try {
    await db.collection('comments').doc(commentId).delete();
    return { success: true };
  } catch(err) {
    console.error(err);
    return { success: false, error: "Failed to delete comment" };
  }
});

// -----------------------------
// Edit profile function
// -----------------------------
exports.editProfile = functions.https.onCall(async (data, context) => {
  const { token, profile } = data;
  if(!token || !profile) return { success: false, error: "Missing data" };

  const session = await db.collection('sessions').doc(token).get();
  if(!session.exists) return { success: false, error: "Invalid session" };

  try {
    await db.collection('meta').doc('profile').set(profile);
    return { success: true };
  } catch(err) {
    console.error(err);
    return { success: false, error: "Failed to edit profile" };
  }
});
