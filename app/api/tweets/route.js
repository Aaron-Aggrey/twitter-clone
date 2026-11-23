
import { makeSureDbIsReady } from "../../../lib/db";
import { Tweet } from "../../../models/Tweet";

// GET /api/tweets - Retrieve all tweets
export async function GET() {
  try {
    await makeSureDbIsReady();

    const tweets = await Tweet.find({}).sort({ createdAt: -1 });

    return Response.json(tweets);
  } catch (error) {
    console.error("Error fetching tweets:", error);

    return Response.json(
      { error: "Error fetching tweets" },
      { status: 500 }
    );
  }
}

// POST /api/tweets - Create a new tweet
export async function POST(request) {
  try {
    await makeSureDbIsReady();

    const body = await request.json();

    const tweet = await Tweet.create({
      content: body.content,
      author: body.author,
    });

    return Response.json(tweet, { status: 201 });
  } catch (error) {
    console.error("Error creating tweet:", error);

    return Response.json(
      { error: error.message },
      { status: 400 }
    );
  }
}
