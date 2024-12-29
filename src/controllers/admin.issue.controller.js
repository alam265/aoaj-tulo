const Issue = require('../models/issue.model');

// Get all issues for dashboard
exports.getAllIssues = async (req, res) => {
    try {
        const issues = await Issue.find()
            .sort({ createdAt: -1 }) // Most recent first
            .select('title description category location status createdAt');
        
        res.render('admindashboard/dashboard', { 
            component: 'issues',
            issues: issues
        });
    } catch (error) {
        console.error('Error fetching issues:', error);
        res.status(500).json({ message: 'Error fetching issues' });
    }
};

// Update issue status
exports.updateIssueStatus = async (req, res) => {
    try {
        const { _id, status, adminResponse } = req.body;
        console.log('Received request body:', req.body);
        
        const updateData = {
            status: status,
            adminResponse: {
                message: adminResponse,
                updatedAt: Date.now()
            }
        };
        console.log('Update data:', updateData);

        const updatedIssue = await Issue.findByIdAndUpdate(
            _id,
            updateData,
            { new: true }
        );

        if (!updatedIssue) {
            return res.status(404).json({ success: false, message: 'Issue not found' });
        }

        console.log('Updated Issue:', updatedIssue);

        res.json({ success: true, issue: updatedIssue });
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get issue statistics
exports.getIssueStats = async (req, res) => {
    try {
        const stats = await Issue.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json(stats);
    } catch (error) {
        console.error('Error fetching issue statistics:', error);
        res.status(500).json({ message: 'Error fetching statistics' });
    }
};
