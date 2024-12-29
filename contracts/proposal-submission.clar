;; Proposal Submission Contract

(define-data-var last-proposal-id uint u0)

(define-map proposals
  { proposal-id: uint }
  {
    author: principal,
    title: (string-ascii 100),
    description: (string-utf8 1000),
    data-url: (string-ascii 255),
    status: (string-ascii 20)
  }
)

(define-public (submit-proposal (title (string-ascii 100)) (description (string-utf8 1000)) (data-url (string-ascii 255)))
  (let
    (
      (new-id (+ (var-get last-proposal-id) u1))
    )
    (map-set proposals
      { proposal-id: new-id }
      {
        author: tx-sender,
        title: title,
        description: description,
        data-url: data-url,
        status: "submitted"
      }
    )
    (var-set last-proposal-id new-id)
    (ok new-id)
  )
)

(define-read-only (get-proposal (proposal-id uint))
  (ok (map-get? proposals { proposal-id: proposal-id }))
)

(define-read-only (get-last-proposal-id)
  (ok (var-get last-proposal-id))
)

