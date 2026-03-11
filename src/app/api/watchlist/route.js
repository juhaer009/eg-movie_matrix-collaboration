import { NextResponse } from 'next/server';

// Use a Map to store watchlist data in memory (persists during dev server runtime)
// In production, you should use a real database like Firebase, MongoDB, etc.
const watchlistStore = new Map();

// Helper function to get watchlist key
const getWatchlistKey = (userId, movieId) => `${userId}_${movieId}`;

export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, movieId } = body;

    // Validate input
    if (!userId || !movieId) {
      return NextResponse.json(
        { error: 'userId and movieId are required' },
        { status: 400 }
      );
    }

    const key = getWatchlistKey(userId, movieId);

    // Check if already exists
    if (watchlistStore.has(key)) {
      return NextResponse.json(
        { error: 'Movie already in watchlist. Use DELETE to remove.' },
        { status: 409 }
      );
    }

    // Add to watchlist
    const watchlistItem = {
      userId,
      movieId,
      createdAt: new Date().toISOString()
    };
    
    watchlistStore.set(key, watchlistItem);
    
    console.log('Added to watchlist:', key);
    console.log('Current watchlist size:', watchlistStore.size);
    
    return NextResponse.json({
      message: 'Movie added to watchlist',
      action: 'added',
      watchlistId: key,
      data: watchlistItem
    }, { status: 201 });
  } catch (error) {
    console.error('Error in watchlist POST API:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();
    const { userId, movieId } = body;

    // Validate input
    if (!userId || !movieId) {
      return NextResponse.json(
        { error: 'userId and movieId are required' },
        { status: 400 }
      );
    }

    const key = getWatchlistKey(userId, movieId);

    // Check if exists
    if (!watchlistStore.has(key)) {
      return NextResponse.json(
        { error: 'Movie not found in watchlist' },
        { status: 404 }
      );
    }

    // Remove from watchlist
    watchlistStore.delete(key);
    
    console.log('Removed from watchlist:', key);
    console.log('Current watchlist size:', watchlistStore.size);
    
    return NextResponse.json({
      message: 'Movie removed from watchlist',
      action: 'removed',
      watchlistId: key
    });
  } catch (error) {
    console.error('Error in watchlist DELETE API:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    // Filter watchlist items for this user
    const userWatchlist = [];
    for (const [key, item] of watchlistStore.entries()) {
      if (item.userId === userId) {
        userWatchlist.push({
          id: key,
          ...item
        });
      }
    }
    
    console.log(`Fetching watchlist for user ${userId}:`, userWatchlist.length, 'items');
    
    return NextResponse.json({
      watchlist: userWatchlist,
      count: userWatchlist.length
    });
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}