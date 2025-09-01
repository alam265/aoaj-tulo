const Issues = require("../models/Issue");


module.exports.searchController = async (req, res) => {
    try {
        // Extract the search query from the request
        const searchQuery = req.query.query;
  
        // Validate if a query is provided
        if (!searchQuery) {
            return res.status(400).json({ error: 'Search query is required' });
        }
  
        // Use a case-insensitive regular expression to match the query in title or description
        const issues = await Issues.find({
            $or: [
                { title: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search in the title
                { description: { $regex: searchQuery, $options: 'i' } } // Case-insensitive search in the description
            ]
        });
         const user = req.session.user
        // Return the matching issues
        res.render("searchResult", {issues, user})
    } catch (error) {
        console.error('Error while searching issues:', error);
        res.status(500).json({ error: 'An error occurred while searching' });
    }
  };