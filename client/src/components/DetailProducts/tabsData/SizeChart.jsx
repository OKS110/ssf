export default function SizeChart (){
    return (
        <div className="size-chart">

        <table className="tbl_info" summary="Size">
                    <colgroup>
                        <col style={{ width: "100px" }} />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th><span>사이즈</span></th>
                            <td className="active"><span>XS</span></td>
                            <td><span>S</span></td>
                            <td><span>M</span></td>
                            <td><span>L</span></td>
                        </tr>
                        <tr>
                            <th><span>허리둘레</span></th>
                            <td className="active"><span>67</span></td>
                            <td><span>71</span></td>
                            <td><span>75</span></td>
                            <td><span>79</span></td>
                        </tr>
                        <tr>
                            <th><span>엉덩이둘레</span></th>
                            <td className="active"><span>92.5</span></td>
                            <td><span>96.5</span></td>
                            <td><span>100.5</span></td>
                            <td><span>104.5</span></td>
                        </tr>
                        <tr>
                            <th><span>옷길이(아웃심)</span></th>
                            <td className="active"><span>77</span></td>
                            <td><span>78</span></td>
                            <td><span>79</span></td>
                            <td><span>80</span></td>
                        </tr>
                        <tr>
                            <th><span>밑단너비</span></th>
                            <td className="active"><span>187</span></td>
                            <td><span>189</span></td>
                            <td><span>191</span></td>
                            <td><span>193</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>

    );
}