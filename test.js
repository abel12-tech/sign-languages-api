


describe('User Authentication and Authorization Integration Test', () => {
    it('should allow an admin user to access restricted resources', async () => {
      const adminCredentials = {
        username: 'admin',
        password: 'admin123',
      };
      const adminResponse = await request(app)
        .post('/api/login')
        .send(adminCredentials);
      
      const restrictedEndpointResponse = await request(app)
        .get('/api/restricted')
        .set('Authorization', `Bearer ${adminResponse.data.token}`);
  
      
      expect(restrictedEndpointResponse.status).toBe(200);
      
      expect(restrictedEndpointResponse.data.message).toBe('Access granted');
    });
  });

  
  
  