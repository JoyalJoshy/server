import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class Test {
    public static void main(String[] args) {
        sendHttpRequest("This is from java");
    }

    public static String sendHttpRequest(String content) {
        String result = null;
        try {

            URL url = new URL("http://192.168.137.1:3000");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "text/plain; charset=utf-8");
            connection.setRequestProperty("Accept", "text/plain");
            connection.setDoOutput(true);

            OutputStream os = connection.getOutputStream();
            byte[] input = content.getBytes("utf-8");
            os.write(input, 0, input.length);
            System.out.println("Http Function Runned");
            int responseCode = connection.getResponseCode();
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream(), "utf-8"));
            StringBuilder response = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                response.append(line);
                System.out.println("The response is " + line);
            }
            reader.close();
            connection.disconnect();
        } catch (Exception e) {
            System.out.println("The error of http is " + e.getMessage());
            e.printStackTrace();
        }
        return null;
    }
}