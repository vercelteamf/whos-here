import { PSDB } from 'planetscale-node';

export default async function handler(req, res) {
    const conn = new PSDB('main', {namedPlaceholders: true});
    const { custom_hash, new_hash} = req.query;
    var user = {      
      custom_hash: custom_hash,
      new_hash: new_hash,
  
    };
  
    const [dbResult] = await conn.execute(
        `UPDATE users SET custom_hash = '${user.new_hash}' WHERE custom_hash='${user.custom_hash}'`
    );
    
    // res.setHeader('Cache-Control', 'max-age=0, s-maxage=30');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
  }