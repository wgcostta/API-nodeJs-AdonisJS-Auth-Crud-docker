"use strict";

const Response = require("@adonisjs/framework/src/Response");

const Tweet = use("App/Models/Tweet");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tweets
 */
class TweetController {
  // Removido métodos Edit e Create que são utilizados para views

  /**
   * Show a list of all tweets.
   * GET tweets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const listTweets = await Tweet.all();
    return listTweets;
  }

  /**
   * Create/save a new tweet.
   * POST tweets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth }) {
    const data = request.only(["content"]);
    const tweet = await Tweet.create({ user_id: auth.user.id, ...data });

    return tweet;
  }

  /**
   * Display a single tweet.
   * GET tweets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const tweet = await Tweet.findOrFail(params.id);
    return tweet;
  }

  /**
   * Update tweet details.
   * PUT or PATCH tweets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const data = request.only(["content"]);
    const tweet = await Tweet.update({ user_id: auth.user.id, ...data });

    return tweet;
  }

  /**
   * Delete a tweet with id.
   * DELETE tweets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, auth, response }) {
    const tweet = await Tweet.findOrFail(params.id);
    if (tweet.user_id !== auth.user.id) {
      return response.status(401);
    } else {
      tweet.delete();
    }
  }
}

module.exports = TweetController;
