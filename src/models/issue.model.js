const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Healthcare', 'Education', 'Environment', 'Infrastructure', 'Other'] // Example categories
    },
    tags: [String],
    location: {
        type: String,
        required: true
    },
    media: {
        type: [String], // URLs or paths to media files
        default: []
    },
    status: {
        type: String,
        enum: ['Pending', 'Under Review', 'Resolved'],
        default: 'Pending'
    },
    adminResponse: {
        message: {
            type: String,
            default: ''
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    },
    upvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    downvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        comment: String,
        date: {
            type: Date,
            default: Date.now
        }
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    anonymous: {
        type: Boolean,
        default: false
    }
});

issueSchema.methods.toJSON = function() {
    const issue = this;
    const issueObject = issue.toObject();

    if (issue.anonymous) {
        delete issueObject.createdBy;
    }

    return issueObject;
};

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
