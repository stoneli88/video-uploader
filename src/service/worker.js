const videoEncoder = require("./encoder");

// Babel Compiler
// -------------------------------------------------
Object.defineProperty(exports, "__esModule", {
  value: true
});
// -------------------------------------------------

// create JOBS.
exports.createEncoderJOB = async (queue, jobData) => {
  const job = await queue
    .createJob({
      video_path: jobData.videoPath,
      video_name: jobData.videoName,
      video_size: jobData.videoSize
    })
    .setId(jobData.videoUUID)
    .timeout(60 * 60 * 1000)
    .retries(3)
    .save();

  return job;
};

// process jobs.
exports.processJob = queue => {
  queue.process([1], (job, done) => {
    console.log(`#### [BeeQueue]: Processing job ${job.id}`);
    videoEncoder
      .encodeVideo(job)
      .then(ret => {
        done(null, ret);
      })
      .catch(err => {
        done(err);
      });
  });
};
