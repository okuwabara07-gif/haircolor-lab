import urllib.request, json, os, sys

key = os.environ.get("RESEND_API_KEY","")
subject = os.environ.get("NOTIFY_SUBJECT","AOKAE通知")
body_file = os.environ.get("NOTIFY_BODY_FILE","")

if body_file and os.path.exists(body_file):
    with open(body_file) as f:
        body = f.read()
else:
    body = os.environ.get("NOTIFY_BODY","通知メッセージ")

data = json.dumps({
    "from": "AOKAE Bot <onboarding@resend.dev>",
    "to": ["o.kuwabara07@gmail.com"],
    "subject": subject,
    "text": body
}).encode()

req = urllib.request.Request(
    "https://api.resend.com/emails",
    data=data,
    headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
    method="POST"
)
try:
    res = urllib.request.urlopen(req).read()
    print("メール送信完了:", json.loads(res).get("id",""))
except Exception as e:
    print("送信エラー:", e)
