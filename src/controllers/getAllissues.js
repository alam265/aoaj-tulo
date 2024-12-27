const IssueModel = require('../models/Issue');
const UserModel = require('../models/User');

module.exports.getAllIssues = async (req, res) => {
  try {
    const issues = await IssueModel.find()
    .populate({ path: 'user', select: 'username' }) 
    .sort({ createdAt: -1 });
    const user = await UserModel.findOne({username: req.user});
  
    
    res.render('allIssues', { issues ,user});
  } catch (error) {
    console.error('Error fetching issues:', error);
    res.status(500).send('Server Error');
  }
};