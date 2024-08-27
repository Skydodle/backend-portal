const Comment = require('../models/Comment');
const Employee = require('../models/Employee');
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
  const { commentId } = req.params; // Changed from id to commentId
  const { description } = req.body;
  const userId = req.user.id;

  try {
    // Find the comment first
    const comment = await Comment.findById(commentId);

    // Check if the user is the creator of the comment
    if (comment.createdBy.toString() !== userId) {
      return res
        .status(403)
        .json({ message: 'Unauthorized to update this comment' });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId, // Changed from id to commentId
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
    console.error(error);
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

    const commentsWithEmployeeDetails = await Promise.all(
      report.comments.map(async (comment) => {
        const employee = await Employee.findOne({ userId: comment.createdBy });

        return {
          ...comment.toObject(),
          createdBy: {
            firstName: employee?.firstName || 'Unknown',
            lastName: employee?.lastName || '',
          },
        };
      }),
    );

    res.status(200).json(commentsWithEmployeeDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get comments', error });
  }
};

module.exports = {
  addCommentToFacilityReport,
  updateComment,
  getCommentsForFacilityReport,
};
