exports.seed = function (knex, Promise) {
  return knex('btc_address_list')
    .del() // delete all user's
    .then(() =>
      knex('btc_address_list').insert(
        [{
          "address": "1MAhRt279uYmVC1dUxKR6dWwEULBJT34Nh"
        }],
      ),
    );
};