const db = require('./connection');
const Comment = require('../models/Comment');
const User = require('../models/User');

const seedComments = async () => {
  try {
    // Find a user to associate the comments with (you can replace this with a specific user if needed)
    const user = await User.findOne({ username: 'hradmin' });

    if (!user) {
      console.error(
        'User not found. Please ensure the user exists before seeding comments.',
      );
      return;
    }

    await Comment.deleteMany({}); // Delete existing comments

    const commentsData = [
      {
        description: 'There is a leak in the kitchen.',
        createdBy: user._id,
      },
      {
        description: 'The air conditioning is not working.',
        createdBy: user._id,
      },
      {
        description: 'The front door lock is broken.',
        createdBy: user._id,
      },
    ];

    await Comment.insertMany(commentsData);

    console.log('Comments seeded successfully');
  } catch (error) {
    console.error('Error seeding comments', error);
  } finally {
    await db.close();
  }
};

seedComments();
