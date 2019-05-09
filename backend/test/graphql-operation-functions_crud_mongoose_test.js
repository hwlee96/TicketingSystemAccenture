
// const describe = require('mocha').describe;
// const it = require('mocha').it;
// const expect = require('chai').expect;
// const graphql = require('graphql').graphql;
// const schema = require('../schema/schema');



// describe('Creating documents', () => {

//     it('creates a request', (done) => {
//         const query = `
//         query {
//           users {
//             firstName
//           }
//         }
//       `;

//       graphql(schema, query).then(result => {
//         //console.log(result.data); 
//         expect(result).to.deep.equal({
//             data: {
//                 users: [
//                   { firstName: "Benjamin" },
//                   { firstName: "Bertha" },
//                   { firstName: "Hang Wee" },
//                   { firstName: "Kenneth" }
//                 ]}});
//               });
//       done();
//             });  
//     });




    /*
    it('creates a request', (done) => {
        const params = { someId: "5c9aeaac37024e554cee2750" };
        const query = `
        query ($someId: String!) {
          user(id: $someId) {
            firstName
          }
        }
      `;
      //const result = graphql(schema, query, null, null, params);
      
      graphql(schema, query, null, null, params).then(result => {

        console.log(result);
      
      });

        done();
            }); */



  