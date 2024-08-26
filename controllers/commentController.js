const Comment = require('../models/Comment');
const FacilityReport = require('../models/FacilityReport');

// Controller method to add a new comment to a facility report
const addCommentToFacilityReport = async (req, res) => {
  const { reportId } = req.params;
  const { description } = req.body;
  const userId = req.user.id;
  try {
    const newComment = await Comment.create({
      description,
      createdBy: userId,
    });

    await FacilityReport.findByIdAndUpdate(reportId, {
      $push: { comments: newComment._id },
    });

    res.status(201).json({ message: 'Comment added successfully', newComment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add comment', error });
  }
};

// Controller method to update an existing comment
const updateComment = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { description },
      { new: true },
    );

    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res
      .status(200)
      .json({ message: 'Comment updated successfully', updatedComment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update comment', error });
  }
};

// Controller method to get all comments for a specific facility report
const getCommentsForFacilityReport = async (req, res) => {
  const { reportId } = req.params;

  try {
    const report = await FacilityReport.findById(reportId).populate('comments');

    if (!report) {
      return res.status(404).json({ message: 'Facility report not found' });
    }

    res.status(200).json(report.comments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get comments', error });
  }
};

module.exports = {
  addCommentToFacilityReport,
  updateComment,
  getCommentsForFacilityReport,
};
