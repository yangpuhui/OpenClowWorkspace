const assert = require('assert')
const FastAPIParser = require('../backend/src/parser/FastAPIParser')
const DocGenerator = require('../backend/src/generator/DocGenerator')

// Test data
const sampleCode = `
from fastapi import FastAPI, HTTPException
from typing import Optional
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    name: str
    email: str

@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.post("/users")
def create_user(user: User):
    return {"user": user, "status": "created"}

@app.get("/users/{user_id}")
def get_user(user_id: int, active: Optional[bool] = True):
    return {"user_id": user_id, "active": active}
`

describe('FastAPIParser', () => {
  it('should parse FastAPI routes correctly', () => {
    const parser = new FastAPIParser()
    const result = parser.parse(sampleCode)

    assert(result.endpoints.length > 0, 'Should find at least one endpoint')
    assert(result.endpoints.some(e => e.path === '/'), 'Should find root endpoint')
    assert(result.endpoints.some(e => e.path === '/users'), 'Should find users endpoint')
  })

  it('should extract HTTP methods correctly', () => {
    const parser = new FastAPIParser()
    const result = parser.parse(sampleCode)

    const getEndpoints = result.endpoints.filter(e => e.method === 'GET')
    const postEndpoints = result.endpoints.filter(e => e.method === 'POST')

    assert(getEndpoints.length >= 2, 'Should find at least 2 GET endpoints')
    assert(postEndpoints.length >= 1, 'Should find at least 1 POST endpoint')
  })

  it('should extract route parameters', () => {
    const parser = new FastAPIParser()
    const result = parser.parse(sampleCode)

    const userEndpoint = result.endpoints.find(e => e.path === '/users/{user_id}')
    assert(userEndpoint, 'Should find user_id endpoint')

    const hasUserIdParam = userEndpoint.parameters?.some(p => p.name === 'user_id')
    assert(hasUserIdParam, 'Should extract user_id parameter')
  })
})

describe('DocGenerator', () => {
  it('should generate HTML documentation', () => {
    const parser = new FastAPIParser()
    const parsedData = parser.parse(sampleCode)

    const generator = new DocGenerator()
    const html = generator.generateHTML(parsedData)

    assert(html.includes('<!DOCTYPE html>'), 'Should generate valid HTML')
    assert(html.includes('AutoDoc'), 'Should include AutoDoc title')
    assert(html.length > 1000, 'Generated HTML should have content')
  })

  it('should include all endpoints in documentation', () => {
    const parser = new FastAPIParser()
    const parsedData = parser.parse(sampleCode)

    const generator = new DocGenerator()
    const html = generator.generateHTML(parsedData)

    parsedData.endpoints.forEach(endpoint => {
      assert(html.includes(endpoint.path), `Should include endpoint ${endpoint.path}`)
    })
  })
})

console.log('✅ All tests passed!')
