const describe = require('mocha').describe;
const it = require('mocha').it;
const EasyGraphQLTester = require('easygraphql-tester');
const schema = require('../../schema/schema');

let tester;
describe('Testing Queries', () => {
      tester = new EasyGraphQLTester(schema)

      it('Valid query for all USERS - all valid input data fields', () => {
        const validUsersQuery = `
          {
            users {
                id
                firstName
                lastName
                email
                contactNumber
                accountType
            }
          }
        `
        // First arg: false, there is no invalidField on the schema.
        tester.test(true, validUsersQuery)
      })

      it('Invalid query for all USERS - all valid input data fields', () => {
        const invalidUsersQuery = `
          {
            requests {
                id
                firstName
                lastName
                emailAddress
                contactNumber
                accountType
            }
          }
        `
        tester.test(false, invalidUsersQuery)
      })

      it('Invalid query for all REQUESTS - any invalid input data fields', () => {
        const invalidRequestsQuery = `
          {
            requests {
                id
                asset
                type
                subject
                dateRequested
                priority
                status
                assigned
                dateResolved
                dateClosed
                mainThread
                extraWrongField
            }
          }
        `
        tester.test(false, invalidRequestsQuery)
      })

      it('Valid query for all REQUESTS - all valid input data fields', () => {
        const ValidRequestsQuery = `
          {
            requests {
                id
                asset
                type
                subject
                dateRequested
                priority
                status
                assigned
                dateResolved
                dateClosed
                mainThread
            }
          }
        `
        tester.test(true, ValidRequestsQuery)
      })

      it('Invalid query for all THREADS - any invalid input data fields', () => {
        const invalidThreadsQuery = `
          {
            threads {
                id
                threadContent
                threadCreatedDateS
                
            }
          }
        `
        tester.test(false, invalidThreadsQuery)
      })

      it('Valid query for all THREADS - all valid input data fields', () => {
        const ValidThreadsQuery = `
          {
            threads {
                id
                threadContent
                threadCreatedDate
            }
          }
        `
        tester.test(true, ValidThreadsQuery)
      })
    })

describe('Testing Mutations', () => {
    tester = new EasyGraphQLTester(schema)

    //Testing Create Request Mutation
    const addRequestMutation = `
     mutation (
           $asset: String!
           $type: String!
           $subject: String!
           $dateRequested: String!
           $priority: String!
           $status: String!
           $assigned: String!
           $dateResolved: String!
           $dateClosed: String!
           $mainThread: String!
           $requesterId: ID!
       ) {
       addRequest(
           asset: $asset
           type: $type
           subject: $subject
           dateRequested: $dateRequested
           priority: $priority
           status: $status
           assigned: $assigned
           dateResolved: $dateResolved
           dateClosed: $dateClosed
           mainThread: $mainThread
           requesterId: $requesterId
       ) {
           id
           asset
           type
           subject
           dateRequested
           priority
           status
           dateResolved
           dateClosed
           mainThread
           assigned
       }
     }
   `
      it('Create Request Mutation valid - all input fields present and according to respective data types', () => {
  
        tester.test(true, addRequestMutation, {
            asset: "API",
            type: "Purchase",
            subject: "Purchase",
            dateRequested: "4 April 2019",
            priority: "Low",
            status: "Open",
            assigned: "Bertha",
            dateResolved: "-",
            dateClosed: "-",
            mainThread: "Hi I would like to enquire about...",
            requesterId: "5c9aeae037024e554cee2752",                      
        })
      })

      it('Create Request Mutation Invalid - missing required input field: e.g. requesterId', () => {
        tester.test(false, addRequestMutation, {
            asset: "API",
            type: "Purchase",
            subject: "Purchase",
            dateRequested: "4 April 2019",
            priority: "Low",
            status: "Open",
            assigned: "Bertha",
            dateResolved: "-",
            dateClosed: "-",
            mainThread: "Hi I would like to enquire about...",
        })
      })
      
      it('Create Request Mutation Invalid - incorrect data type for any input field: e.g. Integer for input field asset', () => {
        tester.test(false, addRequestMutation, {
            asset: 999,
            type: "Purchase",
            subject: "Purchase",
            dateRequested: "4 April 2019",
            priority: "Low",
            status: "Open",
            assigned: "Bertha",
            dateResolved: "-",
            dateClosed: "-",
            mainThread: "Hi I would like to enquire about...",
            requesterId: "5c9aeae037024e554cee2752",       
        })
      })

    //Test Creating Thread Mutation
      const addThreadMutation = `
      mutation(
          $threadContent: String!
          $threadCreatedDate: String!
          $requestId: ID!
          $threadImage: String!
        ) {
          addThread(
            threadContent: $threadContent
            threadCreatedDate: $threadCreatedDate
            requestId: $requestId
            threadImage: $threadImage

          ) {
            id
            threadContent
            threadCreatedDate
            threadImage
            
          }
        }
      `
      it('Create Thread Mutation valid - all input fields present and according to respective data types', () => {
        tester.test(true, addThreadMutation, {
            threadContent: "Hi I would like to...",
            threadCreatedDate: "4 April 2019",
            requestId: "87321u398y87y39132",
            threadImage: "test"
        })
      })

      it('Create Thread Mutation Invalid - missing required input field: e.g. requestId', () => {
        tester.test(false, addThreadMutation, {
            threadContent: "Hi I would like to...",
            threadCreatedDate: "4 April 2019",

        })
      })
      
      it('Create Thread Mutation Invalid - incorrect data type for any input field: e.g. Float for input field threadContent', () => {
        tester.test(false, addThreadMutation, {
            threadContent: 5.123,
            threadCreatedDate: "4 April 2019",
            requestId: "87321u398y87y39132",

        })
      })

      //Test Update Request Assigned
      const updateRequestAssigned = `
        mutation (
            $id: ID!
            $assigned: String!
        
          ) {
            updateRequestAssigned(
              id: $id
              assigned: $assigned
            ) {
              id
              assigned
            }
          }
        `
      it('Update Request Assigned property Valid - all input fields present and according to respective data types', () => {
        tester.test(true, updateRequestAssigned, {
            id: "87321u398y87y39132",
            assigned: "Hang Wee"
        })
      })

      it('Update Request Assigned property Invalid - missing input field: id', () => {
        tester.test(false, updateRequestAssigned, {
            assigned: "Hang Wee"

        })
      })

      it('Update Request Assigned property Invalid - incorrect input field type', () => {
        tester.test(false, updateRequestAssigned, {
            id: "87321u398y87y39132",
            assigned: 55

        })
      })

      //Test Update Request Status
      const updateRequestStatusMutation = `
      mutation (
        $id: ID!
        $status: String!
        $dateResolved: String!
      ) {
        updateRequestStatus(
          id: $id
          status: $status
          dateResolved: $dateResolved
        ) {
          id
          status
          dateResolved
        }
      }
      `
      it('Update Request Status property Valid - all input fields present and according to respective data types', () => {
        tester.test(true, updateRequestStatusMutation, {
            id: "87321u398y87y39132",
            status: "Resolved",
            dateResolved: "2019-6-2"
        })
      })

      it('Update Request Status property Invalid - missing input field: status', () => {
        tester.test(false, updateRequestStatusMutation, {
            id: "87321u398y87y39132",
            dateResolved: "2019-6-2"
        })
      })

      it('Update Request Status property Invalid - incorrect input field type', () => {
        tester.test(false, updateRequestStatusMutation, {
            id: "87321u398y87y39132",
            status: "Resolved",
            dateResolved: 20190604
        })
      })

      //Testing Delete Request Mutation
      const deleteRequestMutation = `
        mutation deleteRequestMutation(
            $id: ID!
        ) {
            deleteRequest(
            id: $id
            ) {
                id
            }
        }
      `
      it('Delete Request Valid', () => {
        tester.test(true, deleteRequestMutation, {
            id: "87321u398y87y39132",
        })
      })

      it('Delete Request invalid - missing field', () => {
        tester.test(false, deleteRequestMutation, {
        })
      })

  })
