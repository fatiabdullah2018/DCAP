;; Tokenized Voting Contract

(define-fungible-token geo-token)

(define-map votes
  { proposal-id: uint, voter: principal }
  { amount: uint }
)

(define-map proposal-votes
  { proposal-id: uint }
  { total-votes: uint }
)

(define-public (vote (proposal-id uint) (amount uint))
  (let
    (
      (sender tx-sender)
      (current-votes (default-to u0 (get amount (map-get? votes { proposal-id: proposal-id, voter: sender }))))
      (new-total (+ current-votes amount))
    )
    (try! (ft-transfer? geo-token amount sender (as-contract tx-sender)))
    (map-set votes
      { proposal-id: proposal-id, voter: sender }
      { amount: new-total }
    )
    (map-set proposal-votes
      { proposal-id: proposal-id }
      { total-votes: (+ (default-to u0 (get total-votes (map-get? proposal-votes { proposal-id: proposal-id }))) amount) }
    )
    (ok true)
  )
)

(define-read-only (get-votes (proposal-id uint) (voter principal))
  (ok (get amount (default-to { amount: u0 } (map-get? votes { proposal-id: proposal-id, voter: voter }))))
)

(define-read-only (get-total-votes (proposal-id uint))
  (ok (get total-votes (default-to { total-votes: u0 } (map-get? proposal-votes { proposal-id: proposal-id }))))
)

