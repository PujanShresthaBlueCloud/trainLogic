// app/api/airtable/route.js
import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_ID = process.env.AIRTABLE_BASE_ID;
const TABLE_NAME = process.env.AIRTABLE_TABLE_DEMO;

console.log(TABLE_NAME, BASE_ID, API_KEY)

export async function POST(request) {
  try {
    const body = await request.json(); // expect { fields: {...} }
    if (!body?.fields) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    const url = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}`;
    console.log("inside the api airtable ----- ")

    const resp = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ records: [{ fields: body.fields }] }), // create single record
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error("Airtable REST error:", resp.status, text);
      return NextResponse.json({ ok: false, error: "Airtable API error" }, { status: 502 });
    }

    const data = await resp.json();
    return NextResponse.json({ ok: true, created: data.records[0] }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}