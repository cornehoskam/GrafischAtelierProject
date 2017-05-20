<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SubscriptionController extends Controller
{
    // keys corrospond with test acount , not peters acount.
    private $apiKey = '6f9fd4af7d2ae16d0d6d2686266c03ac-us15';
    private $listID = '0f1d25b386';

    public function __construct()
    {
        //$this->middleware('auth');

        $this->dataCenter = substr($this->apiKey, strpos($this->apiKey, '-') + 1);

    }

    public function showSubscriptionPageGET()
    {
        return view('subscription_page');
    }

    public function showSubscriptionPagePOST()
    {
        // error is also given in case of a non-complete post.
        if (!$this->validateInformation()) return view('subscription_page', ['message' => 'Uw emailadress is niet geldig. Als uw emailadress wel geldig is neem dan contact op met het Grafische Atelier.']);

        $httpCode = $this->addSubscription('subscribed');

        if ($httpCode == 200)
        {
            return view('subscription_page', ['message' => 'U bent succesvol geaboneerd.']);
        } else
        {
            switch ($httpCode)
            {
                // 400 isn't the default return error, but it is what i was consistently getting.
                case 400:
                    $msg = 'Dit email is al gebruikt om te aboneren. ';
                    return view('subscription_page', ['message' => $msg]);
                    break;
                default:
                    $msg = 'Een onverwachte fout is opgetreden, onze excusses. ';
                    return view('subscription_page', ['message' => $msg]);
                    break;
            }
        }
        return view('subscription_page', ['message' => 'Als u dit ziet ging er iets fout, neem contact op met Grafische Aterlier denbosch']);
    }

    public function showProfilePagePOST()
    {
        if (Auth::check())
        {
            // not sure how authentication works which multiple users having the same email, or name.
            $user = Auth::user();
            $url = 'https://' . $this->dataCenter . '.api.mailchimp.com/3.0/lists/' . $this->listID . '/members/' . md5(strtolower($user->email));

            if ($this->getStatus($user->email) != null)
            {
                // warning the default case is subscribed, which might not be entirely safe spam wise.
                if ($this->getStatus($user->email) == 'subscribed')
                {
                    $json = json_encode([
                        'status' => 'unsubscribed',
                    ]);
                } else
                {
                    $json = json_encode([
                        'status' => 'subscribed',
                    ]);
                }

                $ch = curl_init($url);
                curl_setopt($ch, CURLOPT_USERPWD, 'SOQ:' . $this->apiKey);
                curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_TIMEOUT, 10);
                curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PATCH');
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
                $result = curl_exec($ch);
                $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
                curl_close($ch);

                echo $result . " : " . $httpCode;

                if ($httpCode == 200)
                {
                    return view('profile', ['message' => '']);
                } else
                {
                    return view('profile', ['message' => 'ERROR']);
                }


            } else
            {
                // user doesn't have a last name.
                $_POST['email'] = $user->email;
                $_POST['firstName'] = $user->name;
                $_POST['lastName'] = '';

                $httpCode = $this->addSubscription('unsubscribed');

                if ($httpCode == 200)
                {
                    return view('', ['message' => 'U bent succesvol geaboneerd.']);
                } else
                {
                    switch ($httpCode)
                    {
                        // 400 isn't the default return error, but it is what i was consistently getting.
                        case 400:
                            $msg = 'Dit email is al gebruikt om te aboneren. ';
                            return view('', ['message' => $msg]);
                            break;
                        default:
                            $msg = 'Een onverwachte fout is opgetreden, onze excusses. ';
                            return view('', ['message' => $msg]);
                            break;
                    }
                }
            }
        }
        return view('errors.404');
    }

    private function validateInformation()
    {
        if (!isset($_POST['email'], $_POST['firstName'], $_POST['lastName'])) return false;
        if (!preg_match('/[\w.\-_]+@\w+(.[a-z]+)+/', $_POST['email'])) return false;

        return true;
    }

    private function cleanData($data)
    {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    public function getStatus($email)
    {

        $url = 'https://' . $this->dataCenter . '.api.mailchimp.com/3.0/lists/' . $this->listID . '/members/' . md5(strtolower($email));

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_USERPWD, 'SOQ:' . $this->apiKey);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $result = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode == 200) return json_decode($result, true)['status'];

        return null;
    }

    // return 200 on succes and 400 on email already in use
    public function addSubscription($status = null)
    {
        if ($status == 'subscribed' || $status == 'unsubscribed')
        {
            $tempStatus = $status;
        } else
        {
            $tempStatus = 'unsubscribed';
        }
        // error is also given in case of a non-complete post.
        $url = 'https://' . $this->dataCenter . '.api.mailchimp.com/3.0/lists/' . $this->listID . '/members';

        $json = json_encode([
            'email_address' => $this->cleanData($_POST['email']),
            'status' => $tempStatus,
            'merge_fields' => [
                'FNAME' => $this->cleanData($_POST['firstName']),
                'LNAME' => $this->cleanData($_POST['lastName'])
            ]
        ]);

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_USERPWD, 'SOQ:' . $this->apiKey);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
        $result = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        return $httpCode;
    }


}