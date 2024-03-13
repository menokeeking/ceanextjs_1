import oracledb from 'oracledb';
oracledb.initOracleClient({libDir: 'C:\\oracle\\instantclient_21_11'});
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

export const connectDB = async () => {
    let con;
    try {
        con = await oracledb.getConnection( {
            user        : "cea",
            password    : "cea",
            connectionString : "sistemdes"
        });
        console.log("Successfully connected to Oracle Database");
        return Promise.resolve(true);
    } catch (err) {
        console.error(err);
        return Promise.reject(false);
    } finally {
        if (con)
        {
            try {
                await con.close();
            } catch (err) {
            console.error(err);
            }
        }
    }
}

