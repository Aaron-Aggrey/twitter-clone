
import { makeSureDbIsReady } from "../../../../lib/db";
import { Tweet } from "../../../../models/Tweet";

// PATCH: Upvote or downvote a tweet
export async function PATCH(request, { params }) {
  await makeSureDbIsReady();

  const { id } = await params;
  const { type } = await request.json();

  const field =
    type === "up" ? "upvotes" :
    type === "down" ? "downvotes" :
    null;

  if (!field) {
    return Response.json(
      { error: 'type must be "up" or "down"' },
      { status: 400 }
    );
  }

  try {
    const tweet = await Tweet.findByIdAndUpdate(
      id,
      { $inc: { [field]: 1 } },
      { new: true }
    );

    if (!tweet) {
      return Response.json(
        { error: "Tweet not found" },
        { status: 404 }
      );
    }

    return Response.json(tweet);
  } catch (error) {
    return Response.json(
      { error: "Invalid tweet id" },
      { status: 400 }
    );
  }
}

// DELETE: Delete a tweet
export async function DELETE(request, { params }) {
  await makeSureDbIsReady();

  const { id } = await params;

  try {
    const tweet = await Tweet.findByIdAndDelete(id);

    if (!tweet) {
      return Response.json(
        { error: "Tweet not found" },
        { status: 404 }
      );
    }

    return Response.json({
      message: "Tweet deleted successfully",
    });
  } catch (error) {
    return Response.json(
      { error: "Invalid tweet id" },
      { status: 400 }
    );
  }
}
