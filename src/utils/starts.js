require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const Issue = require('../models/issue.model');

// Verify MongoDB URI
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    console.error('MONGO_URI is not defined in environment variables');
    process.exit(1);
}

const testIssues = [
    {
        title: "ঢাকা-চট্টগ্রাম মহাসড়কের খানাখন্দ",
        description: "ঢাকা-চট্টগ্রাম মহাসড়কের কুমিল্লা অংশে বড় বড় খানাখন্দ দেখা দিয়েছে। এটি যানজট ও দুর্ঘটনার কারণ হয়ে দাঁড়িয়েছে।",
        category: "Infrastructure",
        location: "কুমিল্লা, ঢাকা-চট্টগ্রাম মহাসড়ক",
        status: "Pending",
        tags: ["road", "safety", "transport"],
        createdBy: new mongoose.Types.ObjectId(),
        media: [],
        upvotes: [],
        downvotes: [],
        comments: [{
            userId: new mongoose.Types.ObjectId(),
            comment: "এই সমস্যাটি দ্রুত সমাধান করা প্রয়োজন",
            date: new Date()
        }],
        anonymous: false,
        adminResponse: {
            message: "",
            updatedAt: new Date()
        },
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: "মোহাম্মদপুর বাস টার্মিনালের অবস্থা",
        description: "মোহাম্মদপুর বাস টার্মিনালে পর্যাপ্ত আলো নেই এবং নিরাপত্তার অভাব রয়েছে। রাতের বেলা যাত্রীদের নিরাপত্তা ঝুঁকিতে রয়েছে।",
        category: "Infrastructure",
        location: "মোহাম্মদপুর, ঢাকা",
        status: "Under Review",
        tags: ["transport", "safety", "lighting"],
        createdBy: new mongoose.Types.ObjectId(),
        media: [],
        upvotes: [],
        downvotes: [],
        comments: [],
        anonymous: true,
        adminResponse: {
            message: "",
            updatedAt: new Date()
        },
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: "বনানী স্কুলের সামনে অবৈধ পার্কিং",
        description: "বনানী স্কুল এন্ড কলেজের সামনে অবৈধ পার্কিংয়ের কারণে স্কুলের ছাত্রছাত্রীদের চলাচলে সমস্যা হচ্ছে।",
        category: "Education",
        location: "বনানী, ঢাকা",
        status: "Resolved",
        tags: ["education", "parking", "traffic"],
        createdBy: new mongoose.Types.ObjectId(),
        media: [],
        upvotes: [],
        downvotes: [],
        comments: [],
        anonymous: false,
        adminResponse: {
            message: "",
            updatedAt: new Date()
        },
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: "মিরপুর শেওড়াপাড়া কমিউনিটি ক্লিনিকের সমস্যা",
        description: "মিরপুর শেওড়াপাড়া কমিউনিটি ক্লিনিকে ডাক্তার ও ওষুধের অভাব রয়েছে। রোগীরা প্রয়োজনীয় সেবা পাচ্ছেন না।",
        category: "Healthcare",
        location: "মিরপুর শেওড়াপাড়া, ঢাকা",
        status: "Pending",
        tags: ["healthcare", "medicine", "doctor"],
        createdBy: new mongoose.Types.ObjectId(),
        media: [],
        upvotes: [],
        downvotes: [],
        comments: [],
        anonymous: false,
        adminResponse: {
            message: "",
            updatedAt: new Date()
        },
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: "গুলশান লেকের পানি দূষণ",
        description: "গুলশান লেকে প্লাস্টিক ও অন্যান্য বর্জ্য ফেলার কারণে পানি দূষিত হচ্ছে। এতে পরিবেশের ক্ষতি হচ্ছে।",
        category: "Environment",
        location: "গুলশান, ঢাকা",
        status: "Under Review",
        tags: ["environment", "pollution", "water"],
        createdBy: new mongoose.Types.ObjectId(),
        media: [],
        upvotes: [],
        downvotes: [],
        comments: [{
            userId: new mongoose.Types.ObjectId(),
            comment: "এই সমস্যা সমাধানে দ্রুত পদক্ষেপ নেওয়া উচিত",
            date: new Date()
        }],
        anonymous: false,
        adminResponse: {
            message: "",
            updatedAt: new Date()
        },
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

async function populateDatabase() {
    let connection;
    try {
        // Connect to MongoDB
        connection = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB successfully');

        // Clear existing issues
        await Issue.deleteMany({});
        console.log('Cleared existing issues');

        // Insert test issues
        const insertedIssues = await Issue.insertMany(testIssues);
        console.log(`Successfully inserted ${insertedIssues.length} issues`);

        // Display inserted issues
        console.log('\nInserted Issues:');
        insertedIssues.forEach((issue, index) => {
            console.log(`\n${index + 1}. ${issue.title}`);
            console.log(`   Status: ${issue.status}`);
            console.log(`   Category: ${issue.category}`);
            console.log(`   Location: ${issue.location}`);
            console.log(`   Created At: ${issue.createdAt}`);
        });

    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    } finally {
        // Close the connection
        if (connection) {
            await mongoose.connection.close();
            console.log('\nDatabase connection closed');
        }
    }
}

// Run the script if it's called directly
if (require.main === module) {
    populateDatabase().then(() => {
        console.log('Database population completed');
        process.exit(0);
    }).catch(error => {
        console.error('Error in database population:', error);
        process.exit(1);
    });
}

module.exports = populateDatabase;