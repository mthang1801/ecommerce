import React, {useState, useEffect} from "react";
import {
  TaskbarContainer,
  Wrapper,
  TasksList,
  ListItem,
  TaskContent,
  TaskContentItem,
  ReadMore,
  ReadLess
} from "./taskbar.styles";

const contents = {
  description : "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde vel ut sequi dolor, vitae nulla cumque corrupti voluptates error ipsam commodi quos, soluta aspernatur pariatur voluptate deserunt quisquam, facere nemo alias nihil sint maiores. Exercitationem, illum illo vero in architecto sint deleniti quam ab voluptatem molestiae ipsa totam rem eveniet quasi quaerat fugit nemo tempora blanditiis quos quo dolore iure! Asperiores voluptate aliquid quidem veniam temporibus quae quia velit tempora, nostrum labore recusandae deleniti maiores repellat consectetur exercitationem porro dolore laborum, debitis neque eum explicabo possimus officiis minima? Maiores officiis vitae totam quaerat inventore quam nulla. Vitae eius in mollitia sint dolor quidem qui earum? Expedita corporis quibusdam sit tempora reiciendis, asperiores non illo fugiat, neque enim praesentium? Deleniti, explicabo! Laudantium fuga soluta consectetur? Est molestiae ut aut aliquam animi autem dignissimos eius impedit repellat explicabo? Beatae quis alias molestias cum ipsam asperiores aliquam magni debitis id nesciunt doloremque voluptatum esse numquam quo incidunt corporis dolorum suscipit reprehenderit aspernatur vero totam quia officiis, quasi nemo! Quae delectus repudiandae, excepturi quisquam ipsam eveniet est ad voluptatibus aperiam optio, animi cum, odio et facere vero voluptate. Ipsum explicabo, consectetur cum harum hic commodi magnam saepe eos, earum recusandae odit animi reiciendis quia reprehenderit! Autem natus ex non fugiat, esse velit placeat nesciunt ipsa necessitatibus dolores sed, fuga numquam consequuntur iste a dolor. Dolorem autem soluta vero eaque quibusdam fugiat maiores, dolores dolorum, impedit eligendi harum nulla repudiandae nisi unde natus fugit totam expedita commodi inventore error ipsam libero maxime! Sit suscipit odit, reprehenderit illo ullam repudiandae maxime adipisci recusandae numquam exercitationem quia, necessitatibus fuga sint rerum aspernatur provident, corrupti accusamus maiores temporibus. Tempora eaque harum ducimus illum officia error commodi unde blanditiis nesciunt molestiae quod, doloribus ipsa laborum. Officia, adipisci natus magnam delectus maiores quod quasi soluta. Molestiae, consectetur! Eius, eum! Doloremque ipsa accusamus officiis nemo tempora omnis animi reprehenderit quis itaque, tenetur totam dolorum adipisci consequatur magni ad hic temporibus aut magnam repudiandae pariatur nisi, dicta amet debitis? Accusamus ex laborum eaque illo quibusdam? Dolorum, molestias? Vitae eligendi accusantium repudiandae pariatur qui ipsam tempora optio fugit consequuntur. Ratione necessitatibus hic provident omnis at deserunt eum facere architecto sint ea quidem minus blanditiis dolores ipsam totam, impedit excepturi quo qui officiis nihil modi dignissimos mollitia. Velit sequi repellendus natus culpa blanditiis hic dolores repellat et, harum maxime iste dolore, enim, officia sit vel voluptatum ad provident! Libero blanditiis nihil impedit maiores ex quos enim eveniet repellat! Itaque, odit non dolores nisi reiciendis fugit! Modi ea laborum vel ratione aspernatur iusto ad quo! Quasi dolorum odit minus nobis, nihil tempora suscipit expedita iusto eos eligendi vel quo. Eos repellat ullam consectetur, quis consequatur possimus doloribus sequi id delectus veniam voluptate quod, tempore nobis ipsum, praesentium corrupti dolorum esse vel quasi optio dolor ut! Eius nulla iste voluptas corporis reiciendis minima accusantium iure vero, numquam recusandae omnis explicabo, sequi repellendus necessitatibus assumenda voluptates quam illum id officia dicta! Placeat ab dicta dolore minus doloribus earum voluptatem debitis, quo architecto eligendi laboriosam animi? Mollitia, molestias.",
  information : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus nisi aliquid unde consequuntur! Quo omnis, nostrum sequi ea dolorem aut est, corporis cumque nobis excepturi harum blanditiis. Mollitia quo atque quisquam illum cupiditate amet facilis accusamus ratione alias deleniti, hic magni laboriosam adipisci fugiat, ab dolore ut impedit, voluptatem animi sed necessitatibus incidunt obcaecati. Rem, nam! Mollitia dolorem voluptatem sit, laboriosam voluptas sunt quasi obcaecati tempora consequuntur, cum corrupti quaerat alias. Odio eum, provident consequatur repellat odit alias dolorum quas omnis voluptatibus debitis adipisci reiciendis nobis architecto nesciunt rerum nostrum, exercitationem perspiciatis, beatae incidunt quae quos blanditiis facere! Quam labore voluptates quisquam quas necessitatibus fugit placeat, tempora nisi maxime officia optio totam tempore accusamus voluptatem explicabo id. Amet libero praesentium inventore, nobis cum eligendi, provident nostrum facere, perferendis recusandae magni facilis odit corporis beatae. Animi fugit nobis eaque autem eligendi dolore earum iure dolor natus beatae, itaque quidem quae porro laborum ut, maxime ipsam aperiam. Fugiat cupiditate perspiciatis blanditiis beatae a! At fugiat ea laborum magni cum voluptate incidunt quasi fuga voluptas voluptates eligendi veniam tempore, corporis ipsa. Consequatur voluptas ullam ea nulla voluptatem voluptate natus? Adipisci, quod doloribus vel dolores impedit voluptatum beatae deserunt est aperiam ducimus veniam facere numquam dignissimos rerum dolore minima eum, iste earum, quidem nemo accusantium sapiente maxime. Distinctio adipisci, perferendis alias error dolorem deserunt nemo vitae nostrum veritatis, obcaecati repellendus nulla quasi corrupti! Eos unde illum facilis, debitis temporibus commodi quo ratione ipsa perspiciatis itaque expedita corporis facere eveniet magnam quis quas. Dicta magnam beatae deserunt exercitationem deleniti quod molestiae similique possimus. Vel incidunt, sint eligendi blanditiis neque quod molestiae at magnam voluptas obcaecati praesentium sequi placeat repellendus molestias minus vero? Culpa ullam, qui sit a aspernatur nesciunt commodi facilis tenetur obcaecati ad consequuntur dolore ut placeat vel beatae voluptatum! Deleniti impedit eaque rem nobis vero earum odit molestias, alias fugit est, iste sunt ratione dolore quos, voluptatem necessitatibus. Eos iste repellat autem amet accusamus provident tenetur, culpa nemo! Dolore quia labore iure laborum voluptatum nemo odio id debitis vero temporibus vitae reiciendis dignissimos earum molestias asperiores esse tempore, natus soluta. Iste odit dolore cum dolor eaque nam molestiae fugit et, ipsum iure illum officia cumque temporibus laboriosam mollitia non quisquam inventore unde totam distinctio blanditiis dignissimos tempora similique? Animi iste obcaecati quibusdam ipsum minus eligendi velit. Accusamus mollitia odio obcaecati facere magnam aliquam unde fugiat perferendis aliquid cum at neque, dolorem minus quos ut repellat, eveniet quaerat, hic molestiae? Assumenda rerum necessitatibus quasi sint cum similique facilis iure optio ad eum aut veritatis deleniti, consequuntur non eveniet molestiae ipsum beatae aliquid eius dolorum doloremque quas? Fuga odio autem, tenetur ipsam dignissimos, ratione cum nemo culpa minus voluptates quibusdam eos eligendi, iusto pariatur dolores optio assumenda inventore! Perferendis voluptate unde exercitationem modi autem necessitatibus. Odio eius deleniti, officia non cum, corporis repellat quibusdam id perferendis reprehenderit voluptatibus et aspernatur quam iusto ad. Quia, iste nulla labore cumque veniam numquam qui est, ipsum minima, cum dicta? Voluptate possimus qui pariatur illo, sit cumque quae omnis blanditiis similique delectus iure aperiam quidem officiis accusantium suscipit reprehenderit numquam placeat architecto. Veniam aspernatur aliquam id ex eum facere reiciendis vel inventore voluptatibus, deserunt, labore ut odit temporibus impedit laboriosam commodi quia beatae praesentium, error nobis perspiciatis? Excepturi perspiciatis sunt, doloribus quaerat natus nesciunt fuga architecto inventore officiis beatae dolores odio quidem ab consequuntur dolorem quis quia amet qui a quo laboriosam! Accusantium culpa architecto accusamus doloribus possimus quas earum, sit quisquam unde atque? Quaerat sed cupiditate eum sit quasi maiores, modi doloremque blanditiis quis aperiam culpa omnis error, veniam ipsum perferendis aliquam alias incidunt, fuga nobis quidem atque. Eius excepturi enim ullam minima impedit odio id nostrum exercitationem, aut architecto cupiditate sunt vero iusto sapiente? Laudantium cumque, aliquam rerum nihil tempore exercitationem voluptates minus eum voluptatum! Perspiciatis pariatur, harum aliquid in laborum ullam corporis itaque vitae quasi omnis eveniet, rerum voluptatum fugit voluptate quisquam provident a quos quae repellat deserunt impedit minus eum temporibus dolores. Quibusdam temporibus nesciunt perferendis repellat velit quam! Ducimus aliquam fuga tenetur minima, nam perferendis libero optio non quod cum porro, eligendi rerum laudantium sit facilis incidunt exercitationem sapiente fugiat sint dolore esse. Quisquam, provident rerum esse unde porro officiis, saepe quo fugiat quos cum recusandae impedit, numquam minima. Distinctio facilis molestiae fugit enim perferendis deleniti voluptas quis dolore asperiores ipsa exercitationem modi minus repudiandae at officia laboriosam explicabo, in nulla temporibus ducimus ea quisquam sunt beatae vel? Fugiat harum odio modi, in iste, illo velit eaque sit praesentium minima accusamus suscipit quaerat excepturi eum quo a commodi quam blanditiis quos magni impedit. Porro architecto exercitationem modi veritatis fuga, culpa vel a, consectetur officia sequi tempora ad, dignissimos magnam. Iusto nulla minima odit aliquid culpa autem fugiat qui saepe asperiores, vitae tempora et minus laboriosam odio itaque exercitationem ratione assumenda nesciunt quae dicta! Esse velit odio exercitationem optio explicabo, consequuntur vel, id, veniam perspiciatis eos vero! Pariatur reprehenderit, nihil nulla harum earum voluptatem? Quaerat maxime dicta iure libero officia excepturi, mollitia suscipit quos sapiente ab necessitatibus, quis repellendus ut quae odio perspiciatis recusandae, amet reiciendis accusantium quibusdam animi nesciunt officiis! Debitis soluta nesciunt voluptatibus porro deleniti. Pariatur expedita impedit labore ad. Quasi quae aspernatur inventore at incidunt. Impedit veniam porro suscipit qui laborum fuga natus tenetur illum eius quibusdam ratione beatae, delectus vitae nihil inventore animi molestiae eveniet nisi magni quaerat dolorum similique expedita enim. A, ipsa et optio eius dolor voluptas quaerat neque, provident quam autem fugiat placeat ipsam quia quae aliquam voluptates cum sit accusantium iusto perspiciatis. Tenetur necessitatibus soluta modi nulla perspiciatis possimus consequatur odio aperiam, minima qui quos error molestiae, ea suscipit. Nemo modi nihil dicta, molestiae fuga voluptates eius accusantium quaerat molestias non ratione aliquid itaque veritatis dignissimos eveniet, necessitatibus odio sint, perspiciatis incidunt ad hic ullam? Quae similique dolores totam commodi odio voluptatum neque ipsum soluta, ut asperiores repellat obcaecati sequi at, cupiditate culpa suscipit officia? Fugiat consequuntur reiciendis officia dicta consequatur, repellat numquam vitae quos consectetur, commodi tempora aut vel magni atque placeat itaque nostrum hic provident!",
  reviews : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident pariatur, quo eaque cumque itaque labore animi beatae. Sit ratione tempora nam vero illum non repellendus perspiciatis doloremque voluptas quos quaerat alias tempore quibusdam numquam harum error sunt asperiores totam, qui iusto eligendi autem perferendis, quisquam neque. Atque ipsa esse magnam!"
}

const Taskbar = ({mobileView, tabletView, product}) => {
  const [task, setTask] = useState("description")
  const [description, setDescription] = useState("");
  const [information, setInformation] = useState("");
  const [reviews, setReviews] = useState([]);  
  const [descriptionReadMore, setDescriptionReadMore] = useState(false);
  const [informationReadMore, setInformationReadMore] = useState(false);
  useEffect(() => {
    if(product.description){
      setDescription(product.description.substr(0,200));
    }
  }, [product.description])
  useEffect(() => {
    if(product.information){
      setInformation(product.information.substr(0,200))
    }
  }, [product.information])
  useEffect(() => {
    if(product.comments){
      setReviews(product.comments.slice(0,5))
    }
  }, [product.comments]);

  const handleDescriptionReadMore = () => {
    if(!descriptionReadMore){
      setDescription(product.description);
      setDescriptionReadMore(true);
    }else{
      setDescription(product.description.substr(0,200));
      setDescriptionReadMore(false);
    }
  }
  
  const handleInformationReadMore = () => {  
    if(!informationReadMore){
      setInformation(product.information);
      setInformationReadMore(true);
    }else{
      setInformation(product.information.substr(0,200));
      setInformationReadMore(false);
    }
  }
  
  return (
    <TaskbarContainer>
      <Wrapper>
        <TasksList mobileView={mobileView} tabletView={tabletView}>
          <ListItem active={task==="description"} onClick={()=> {setTask("description")}}>Description</ListItem>
          <ListItem active={task==="information"} onClick={()=> {setTask("information")}}>Information</ListItem>
          <ListItem active={task==="reviews"} onClick={()=> {setTask("reviews")}}>Reviews (2)</ListItem>
        </TasksList>
      </Wrapper>
      <TaskContent>
        <TaskContentItem show={task==="description"}>
          <div dangerouslySetInnerHTML={{__html : description}}></div>
          {product.description.length > 200 ?  <ReadMore onClick={handleDescriptionReadMore}>{!descriptionReadMore ? "Xem thêm" : "Thu gọn"}</ReadMore> : null}       
        </TaskContentItem>
        <TaskContentItem show={task==="information"}>
          <div dangerouslySetInnerHTML={{__html : information}}></div>
          {product.information.length > 200 ?  <ReadMore onClick={handleInformationReadMore}>{!informationReadMore ? "Xem thêm" : "Thu gọn"}</ReadMore> : null}       
        </TaskContentItem>
        <TaskContentItem show={task==="reviews"}>
          <p>{reviews}</p>
          {contents.reviews.length > 50 && contents.reviews !== reviews &&  <ReadMore onClick={() => setReviews(contents.reviews)}>Xem thêm</ReadMore>}
          {contents.reviews.length > 200 && reviews === contents.reviews && <ReadLess onClick={() => setReviews(contents.reviews.slice(0,200).trim())}>Thu gọn</ReadLess>}
        </TaskContentItem>
      </TaskContent>
    </TaskbarContainer>
  );
};

export default Taskbar;
