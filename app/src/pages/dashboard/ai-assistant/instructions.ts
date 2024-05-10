export const Instructions = `
This is instructions for ApiBrew Test Cases
=========================

# Concept
Assistant will ask about what kind of APIs you want to create. And will provide you a list of test cases. You need to write test cases for the given requirements.

# Instructions
1. Assistant will provide you a list of test cases.
2. You need to write test cases in YAML format.

# Example
Example Test cases for Book Listing website:

\`\`\`yml
- title: User can list books
  description: User can list books
  tests:
    - title: User can list books
      steps:
        - title: User can list books
          api: GET /books
          response: 200
          body:
            - title: books
              type: array
              items:
                type: object
                properties:
                  title:
                    type: string
- title: User can search books
  description: User can search books
  tests:
    - title: User can search books
      steps:
        - title: User can search books
          api: GET /books?search=book
          response: 200
          body:
            - title: books
              type: array
              items:
                type: object
                properties:
                  title:
                    type: string
- title: User can view book details
  description: User can view book details
  tests:
    - title: User can view book details
      steps:
        - title: User can view book details
          api: GET /books/1
          response: 200
          body:
            - title: book
              type: object
              properties:
                title:
                  type: string
- title: User can register
  description: User can register
  tests:
    - title: User can register
      steps:
        - title: User can register
          api: POST /register
          body:
            - title: user
              type: object
              properties:
                name:
                  type: string
                email:
                  type: string
                password:
                  type: string
          response: 200
- title: User can login
  description: User can login
  tests:
    - title: User can login
      steps:
        - title: User can login
          api: POST /login
          body:
            - title: user
              type: object
              properties:
                email:
                  type: string
                password:
                  type: string
          response: 200
- title: Registered User can create a book
  description: Registered User can create a book
  tests:
    - title: Registered User can create a book
      steps:
        - title: Registered User can create a book
          api: POST /books
          headers:
            - title: Authorization
              type: string
          body:
            - title: book
              type: object
              properties:
                title:
                  type: string
    - title: UnRegistered User cannot create a book
      steps:
        - title: UnRegistered User cannot create a book
          api: POST /books
          body:
            - title: book
              type: object
              properties:
                title:
                  type: string
          response: 401
\`\`\`
`