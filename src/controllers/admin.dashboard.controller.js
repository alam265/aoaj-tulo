const Issue = require('../models/issue.model');

//dashboard issue badge returns which css class needs to use
exports.getStatusBadgeClass = function(status) {
    const classes = {
        'Pending': 'badge badge-warning',
        'In Progress': 'badge badge-info',
        'Resolved': 'badge badge-success',
        'Rejected': 'badge badge-danger'
    };
    return classes[status] || 'badge badge-secondary';
};

//here i pass the issue id and the new status which post a request to the update route
exports.updateIssueStatus = async function(issueId, newStatus) {
    try {
        const requestBody = {
            _id: issueId,
            status: newStatus
        };
        const response = await fetch('/admin/issues/update-status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.status);
        }
        const data = await response.json(); 
        if (data.success) {
            const issue = this.issues.find(i => i._id === issueId);
            if (issue) {
                issue.status = newStatus;
            }
        } else {
            throw new Error(data.message || 'Failed to update status');
        }
    } catch (error) {
        console.error('Error details:', {
            message: error.message,
            stack: error.stack
        });
        alert('Error updating status: ' + error.message);
    }
};

//here i computer the total essue resolved and pending issue to dashboard
exports.totalIssues = function() {
    return this.issues.length;
};

exports.activeIssues = function() {
    return this.issues.filter(i => i.status === 'Pending').length;
};

exports.resolvedIssues = function() {
    return this.issues.filter(i => i.status === 'Resolved').length;
};

//dashboard render
exports.renderDashboard = async (req, res) => {
    try {
        const issues = await Issue.find()
            .sort({ createdAt: -1 })
            .select('title description category location status createdAt');

        res.render('admindashboard/dashboard', {
            issues: issues,
            dashboardScript: {
                methods: {
                    getStatusBadgeClass: exports.getStatusBadgeClass.toString(),
                    updateIssueStatus: exports.updateIssueStatus.toString()
                },
                computed: {
                    totalIssues: exports.totalIssues.toString(),
                    activeIssues: exports.activeIssues.toString(),
                    resolvedIssues: exports.resolvedIssues.toString()
                }
            }
        });
    } catch (error) {
        console.error('Error rendering dashboard:', error);
        res.status(500).send('Error loading dashboard');
    }
};