;; Impact Assessment Contract

(define-map assessments
  { proposal-id: uint }
  {
    climate-impact: int,
    economic-impact: int,
    social-impact: int,
    feasibility: uint,
    timestamp: uint
  }
)

(define-public (submit-assessment (proposal-id uint) (climate-impact int) (economic-impact int) (social-impact int) (feasibility uint))
  (begin
    (asserts! (and (>= feasibility u1) (<= feasibility u100)) (err u400))
    (ok (map-set assessments
      { proposal-id: proposal-id }
      {
        climate-impact: climate-impact,
        economic-impact: economic-impact,
        social-impact: social-impact,
        feasibility: feasibility,
        timestamp: block-height
      }
    ))
  )
)

(define-read-only (get-assessment (proposal-id uint))
  (ok (map-get? assessments { proposal-id: proposal-id }))
)

