# VARIABLE=VALUE sh curl-scripts/auth/sign-up.sh

# don't use a password you use for any real websites!
curl "https://tic-tac-toe-api-production.herokuapp.com/games" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{

  }'

# curl "https://tic-tac-toe-api-production.herokuapp.com/games" \
#     --include \
#     --request GET \
#     --header "Content-Type: application/json" \
#     --header "Authorization: Bearer ${TOKEN}" \
#
# curl "https://tic-tac-toe-api-production.herokuapp.com/games/:id" \
#       --include \
#       --request GET \
#       --header "Content-Type: application/json" \
#       --header "Authorization: Bearer ${TOKEN}" \

echo
